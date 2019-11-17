import { randomArticle, summaryArticle } from '../config';

async function getWikiArticle(article = null) {
  const url = article ? summaryArticle(article) : randomArticle;
  const res = await fetch(url);
  const data = await res.json();
  const { pageid, description, title, extract, thumbnail, titles } = data;

  return {
    pageid,
    description,
    title,
    extract,
    thumbnail: thumbnail ? thumbnail.source : null,
    titles: titles ? titles.canonical : null
  };
}

export default getWikiArticle;
