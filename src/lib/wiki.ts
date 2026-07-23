import type { WikiArticle, WikiSummary } from './types';

const REST = 'https://en.wikipedia.org/api/rest_v1';

/**
 * Fetch a fully rendered, cleaned article through our own edge function.
 * The transform (link rewriting, stripping) and edge caching happen there;
 * see functions/api/wiki/[title].ts.
 */
export async function getArticle(title: string): Promise<WikiArticle> {
  const res = await fetch(`/api/wiki/${encodeURIComponent(title)}`);
  if (!res.ok) {
    const { error } = (await res.json().catch(() => ({}))) as { error?: string };
    throw new WikiError(error ?? 'notfound');
  }
  return (await res.json()) as WikiArticle;
}

interface RestSummary {
  pageid?: number;
  title?: string;
  description?: string;
  extract?: string;
  thumbnail?: { source: string } | null;
  titles?: { canonical: string } | null;
  type?: string;
}

function toSummary(data: RestSummary): WikiSummary {
  return {
    pageid: data.pageid ?? null,
    title: data.title ?? '',
    description: data.description ?? '',
    extract: data.extract ?? '',
    thumbnail: data.thumbnail?.source ?? null,
    titles: data.titles?.canonical ?? null,
    type: data.type ?? 'standard',
  };
}

/**
 * A summary card for the start/destination pickers. These are small CORS-enabled
 * JSON responses that need no processing, so we call Wikipedia's REST API
 * directly from the browser. Pass no title to get a random article.
 */
export async function getSummary(title: string | null = null): Promise<WikiSummary> {
  const url = title
    ? `${REST}/page/summary/${encodeURIComponent(title)}`
    : `${REST}/page/random/summary`;
  const res = await fetch(url);
  const data = (await res.json()) as RestSummary;
  return toSummary(data);
}

export class WikiError extends Error {}
