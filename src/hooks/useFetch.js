import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

    fetchData(url);
  }, [url]);
  console.log(loading);
  const pages = data.query && data.query.pages;

  return { loading, pages };
}

export default useFetch;
