import { useEffect, useState } from 'react';
import sanitizeResponse from '../helpers/sanitizeResponse';
import sanitizeHtml from '../helpers/sanitizeHtml';

function useWikiFetch(title) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // Clean up.
  const finalUrl = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${title}&disabletoc=true&disableeditsection=true&disablestylededuplication=true&prop=text|displaytitle`;

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

  const error = data.error ? data.error.code : null;
  const rawData = data && data.parse;
  const pages = sanitizeResponse(loading ? {} : rawData);
  const [displaytitle, , rawContent] = pages;
  const content = sanitizeHtml(rawContent ? rawContent['*'] : null);

  return { loading, pages, content, displaytitle, error };
}

//https://en.wikipedia.org/w/api.php?action=help&modules=parse

export default useWikiFetch;
