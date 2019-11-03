import { useEffect, useState } from 'react';
import sanitizeResponse from '../helpers/sanitizeResponse';

function useWikiLinks(title) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const finalUrl = `
  https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=links&origin=*&pllimit=250&plnamespace=0&format=json`;

  useEffect(() => {
    async function fetchData(url) {
      setLoading(true);
      const data = await fetch(url, {
        mode: 'cors'
      });
      const res = await data.json();
      setData(res);
      setLoading(false);
    }

    fetchData(finalUrl);
  }, [finalUrl, title]);

  const rawData = data.query && data.query.pages;
  const rawLinks = sanitizeResponse(loading ? {} : rawData);

  const links = loading ? [] : rawLinks[0].links;

  return { loading, links };
}

export default useWikiLinks;
