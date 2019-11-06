import { wikiFetchUrl } from '../config';

function useOnDemandWikiFetch(title) {
  function fetchWiki() {
    const url = wikiFetchUrl(title);
    fetch(url, {
      mode: 'cors'
    })
      .then(data => data)
      .then(res => res.json())
      .catch(e => console.log(e));
  }

  return { fetchWiki };
}

export default useOnDemandWikiFetch;
