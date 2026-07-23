export interface DisambigOption {
  title: string;
  href: string;
  gloss: string;
}

/**
 * Pull the candidate meanings out of a disambiguation page's cleaned HTML.
 * Each meaning is a list item like `<li><a href="/wiki/X">X</a>, a gloss</li>`,
 * so we take the first in-game link per item and treat the rest as its gloss.
 */
export function parseDisambiguation(html: string): DisambigOption[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const seen = new Set<string>();
  const options: DisambigOption[] = [];

  doc.querySelectorAll('li').forEach((li) => {
    const a = li.querySelector<HTMLAnchorElement>('a[href^="/wiki/"]');
    const href = a?.getAttribute('href');
    if (!a || !href || href.includes(':') || seen.has(href)) return;
    seen.add(href);

    const title = a.textContent?.trim() ?? '';
    const full = li.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    const gloss = full.startsWith(title)
      ? full.slice(title.length).replace(/^[\s,;:–—-]+/, '')
      : full;

    options.push({ title, href, gloss });
  });

  return options;
}
