import * as helper from '../config';

async function getWikiArticle() {
  const res = await fetch(helper.randomArticle);
  const data = await res.json();
  const {
    description,
    title,
    extract,
    thumbnail: { source },
    titles: { canonical }
  } = data;

  return {
    description,
    title,
    extract,
    source,
    canonical
  };
}

export default getWikiArticle;
