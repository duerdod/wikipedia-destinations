/**
 * GET /api/wiki/:title
 *
 * Fetches a rendered Wikipedia article server-to-server, transforms it with
 * HTMLRewriter (streaming, no dependencies), and returns clean JSON. The heavy
 * lifting lives here so the client bundle stays small and the transform can be
 * cached at the edge. The client still runs a final DOMPurify pass before it
 * injects the markup — that's the actual XSS boundary, since it runs in the
 * same DOM the HTML renders into.
 */

// A descriptive User-Agent is required by Wikipedia API etiquette. We can set
// it here (server-to-server) in a way a browser fetch never could.
const USER_AGENT =
  'Wikidestinations/2.0 (https://wikidestinations.okbry.cool; contact via GitHub) Cloudflare-Pages';

// Cache the transformed article for a day at the edge; browsers a bit less.
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400';

interface WikiParse {
  title: string;
  pageid: number;
  displaytitle: string;
  text: string;
  properties?: Record<string, string>;
}

interface WikiParseResponse {
  parse?: WikiParse;
  error?: { code: string; info: string };
}

export interface WikiArticle {
  title: string;
  pageid: number;
  displaytitle: string;
  html: string;
  // A disambiguation page (e.g. "Rom") lists several meanings rather than being
  // an article itself; the client offers these as a picker.
  disambiguation: boolean;
}

/** Keep only links that stay inside the game; unwrap everything else. */
function isPlayableLink(href: string | null): boolean {
  if (!href) return false;
  // Internal article links: /wiki/Title — but not namespaces (File:, Help:,
  // Category:, Wikipedia:, Special:, ...), which all contain a colon.
  if (href.startsWith('/wiki/') && !href.includes(':')) return true;
  // In-page section anchors, but not citation backrefs.
  if (href.startsWith('#') && !href.startsWith('#cite')) return true;
  return false;
}

/** Elements that are noise for a reading/navigation game — dropped wholesale. */
const DROP_SELECTORS = [
  'style',
  'script',
  'link',
  'meta',
  'table', // infoboxes, navboxes, data tables
  'figure',
  'sup.reference', // [1] citation markers
  '.reflist', // the reference list container
  'ol.references', // …and the bare list if there's no wrapper
  '.mw-references-wrap',
  '.thumb',
  '.infobox',
  '.navbox',
  '.hatnote',
  '.mw-editsection',
  '.reference',
  '.mw-empty-elt',
  '.noprint',
  '.toc', // navigation game doesn't use Wikipedia's own TOC
  '#toc',
];

// Trailing sections cut from the article entirely. They all sit at the end per
// Wikipedia's layout convention, so once we reach the first one we drop it and
// everything after it (headings by id are stable across articles).
const CUT_SECTION_IDS = new Set([
  'See_also',
  'References',
  'Notes',
  'Footnotes',
  'Citations',
  'Sources',
  'Bibliography',
  'Further_reading',
  'External_links',
  'References_and_notes',
  'Notes_and_references',
  'Explanatory_notes',
]);

function transform(html: string): Promise<string> {
  // Per-request state: flips on at the first trailing-section heading.
  const tail = { cutting: false };
  let rewriter = new HTMLRewriter();

  for (const selector of DROP_SELECTORS) {
    rewriter = rewriter.on(selector, {
      element(el) {
        el.remove();
      },
    });
  }

  rewriter = rewriter
    // A trailing-section heading starts the cut; drop the heading itself too.
    .on('h2', {
      element(el) {
        const id = el.getAttribute('id');
        if (id && CUT_SECTION_IDS.has(id)) {
          tail.cutting = true;
          el.remove();
        }
      },
    })
    // Once cutting, drop every remaining top-level block of the article body.
    .on('.mw-parser-output > *', {
      element(el) {
        if (tail.cutting) el.remove();
      },
    })
    // Strip inline styles everywhere — we restyle the article ourselves.
    .on('[style]', {
      element(el) {
        el.removeAttribute('style');
      },
    })
    // Neutralise non-playable links, keeping their text.
    .on('a', {
      element(el) {
        if (!isPlayableLink(el.getAttribute('href'))) {
          el.removeAndKeepContent();
          return;
        }
        el.removeAttribute('title');
        el.removeAttribute('class');
      },
    });

  return rewriter.transform(new Response(html)).text();
}

export const onRequestGet: PagesFunction = async ({ params, request, waitUntil }) => {
  const raw = params.title;
  const title = decodeURIComponent(Array.isArray(raw) ? raw.join('/') : raw);

  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString(), { method: 'GET' });
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const api = new URL('https://en.wikipedia.org/w/api.php');
  api.search = new URLSearchParams({
    action: 'parse',
    format: 'json',
    formatversion: '2',
    page: title,
    prop: 'text|displaytitle|properties',
    redirects: 'true',
    disableeditsection: 'true',
    disablestylededuplication: 'true',
  }).toString();

  const upstream = await fetch(api.toString(), {
    headers: { 'User-Agent': USER_AGENT, 'Api-User-Agent': USER_AGENT },
    cf: { cacheTtl: 3600, cacheEverything: true },
  });

  if (!upstream.ok) {
    return Response.json({ error: 'upstream' }, { status: 502 });
  }

  const data = (await upstream.json()) as WikiParseResponse;
  if (data.error || !data.parse) {
    return Response.json({ error: data.error?.code ?? 'missingtitle' }, { status: 404 });
  }

  const article: WikiArticle = {
    title: data.parse.title,
    pageid: data.parse.pageid,
    displaytitle: data.parse.displaytitle,
    html: await transform(data.parse.text),
    disambiguation: data.parse.properties?.disambiguation !== undefined,
  };

  const response = Response.json(article, {
    headers: { 'Cache-Control': CACHE_CONTROL },
  });
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};
