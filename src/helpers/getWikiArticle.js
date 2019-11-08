import { randomArticle, wikiFetchUrl } from '../config';

async function getWikiArticle(article = null) {
  const url = article ? wikiFetchUrl(article) : randomArticle;
  const res = await fetch(url);
  const data = await res.json();
  const { description, title, extract, thumbnail, titles } = data;
  if (data.parse && data.parse.pageid) {
    return { pageid: data.parse.pageid };
  }
  return {
    description,
    title,
    extract,
    thumbnail: thumbnail ? thumbnail.source : null,
    titles: titles ? titles.canonical : null
  };
}

export default getWikiArticle;
