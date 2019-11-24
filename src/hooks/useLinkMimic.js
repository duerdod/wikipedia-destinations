import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function useLinkMimic({
  ref = null,
  className = '',
  loading = true,
  fn = null
}) {
  const history = useHistory();
  const { article } = useParams();

  useEffect(() => {
    if (ref.current) {
      const [displaytitle, article] = ref.current.children;

      if (!article) return;
      if (!article.classList.contains(className)) {
        return;
      }

      const links = [...article.querySelectorAll('a')];
      links.forEach(link =>
        link.addEventListener('click', e => {
          e.preventDefault();
          const hash = link.getAttribute('href');
          history.push({
            pathname: link.pathname,
            hash: hash.startsWith('#') ? hash : ''
          });
          return fn ? fn(displaytitle.innerText) : null;
        })
      );
    }
  }, [className, history, ref, article, loading, fn]);
}

export default useLinkMimic;

// startsWith('#')
