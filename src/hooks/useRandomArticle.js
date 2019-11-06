import { useEffect, useState } from 'react';

function useRandomArticle() {
  const [random, setRandom] = useState({
    data: null,
    loading: false
  });

  useEffect(() => {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/random/title';
    async function fetchRandom(url) {
      setRandom({ ...random, loading: true });
      const res = await fetch(url);
      const data = await res.json();
      setRandom({ loading: false, data });
    }
    if (!random.loading) {
      fetchRandom(url);
    }
    // eslint-disable-next-line
  }, []);

  const { data, loading } = random;
  if (loading)
    return {
      random: null
    };

  return {
    random: data
  };
}

export default useRandomArticle;
