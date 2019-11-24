import { useEffect, useState } from 'react';
import sanitizeResponse from '../helpers/sanitizeResponse';
import sanitizeHtml from '../helpers/sanitizeHtml';
import { wikiFetchUrl } from '../config';

function useWikiFetch(title) {
  const [wikiFetch, setWikiFetch] = useState({
    data: null,
    loading: false
  });

  useEffect(() => {
    const finalUrl = wikiFetchUrl(title);
    async function fetchData(url) {
      setWikiFetch({ loading: true });
      const res = await fetch(url, {
        mode: 'cors'
      });
      const data = await res.json();

      setWikiFetch({
        loading: false,
        data
      });
    }
    if (!wikiFetch.loading) {
      fetchData(finalUrl);
    }
    // eslint-disable-next-line
  }, [title]);

  const { data, loading } = wikiFetch;

  const error = data && data.error ? data.error.code : null;
  const rawData = data && data.parse;
  const pages = sanitizeResponse(loading ? {} : rawData);
  const [displaytitle, , , rawContent] = pages;
  const content = sanitizeHtml(rawContent ? rawContent['*'] : null);

  return {
    loading,
    pages,
    content,
    displaytitle,
    error,
    pageid: rawData && rawData.pageid
  };
}

export default useWikiFetch;
