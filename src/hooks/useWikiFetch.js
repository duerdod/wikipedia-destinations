import React, { useEffect, useState } from 'react';
import sanitizeResponse from '../helpers/sanitizeResponse';
import sanitizeHtml from '../helpers/sanitizeHtml';

function useWikiFetch(title) {
  const [wikiFetch, setWikiFetch] = useState({
    data: null,
    loading: false
  });

  // Clean up.
  useEffect(() => {
    const finalUrl = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${title}&disabletoc=true&disableeditsection=true&disablestylededuplication=true&prop=text|displaytitle`;
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
  const [displaytitle, , rawContent] = pages;
  const content = sanitizeHtml(rawContent ? rawContent['*'] : null);

  return { loading, pages, content, displaytitle, error };
}

//https://en.wikipedia.org/w/api.php?action=help&modules=parse

export default useWikiFetch;

const params = {
  'action': 'parse'
}

action=parse&origin=*&format=json&page=${title}&disabletoc=true&disableeditsection=true&disablestylededuplication=true&prop=text|displaytitle