import { useEffect, useState } from 'react';
import sanitizeResponse from '../helpers/sanitizeResponse';
import sanitizeHtml from '../helpers/sanitizeHtml';
import useWikiLinks from './useWikiLinks';

function useWikiFetch(title) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const finalUrl = `
  https://en.wikipedia.org/w/api.php?action=query&titles=${title}&origin=*&format=json&prop=extracts|links&pllimit=250`;

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
  const pages = sanitizeResponse(loading ? {} : rawData);
  const content = sanitizeHtml(loading ? null : pages[0].extract);
  const links = loading ? [] : pages[0].links;

  return { loading, pages, content, links };
}

export default useWikiFetch;
