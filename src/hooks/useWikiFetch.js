import { useEffect, useState } from 'react';
import sanitizeResponse from '../helpers/sanitizeResponse';
import sanitizeHtml from '../helpers/sanitizeHtml';

function useWikiFetch(title) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const finalUrl = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${title}&prop=text|displaytitle&redirects=true`;

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

  const rawData = data && data.parse;
  const pages = sanitizeResponse(loading ? {} : rawData);
  const [displaytitle, , , rawContent] = pages;
  const content = sanitizeHtml(loading ? null : rawContent['*']);

  return { loading, pages, content, displaytitle };
}

export default useWikiFetch;
