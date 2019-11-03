import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function useLinkMimic({
  ref = null,
  className = '',
  loading = true,
  fn = null
}) {
  let history = useHistory();
  const { article } = useParams();

  useEffect(() => {
    if (ref.current) {
      const [displaytitle, article] = ref.current.children;

      if (!article.classList.contains(className)) {
        return;
      }

      const links = [...article.querySelectorAll('a')];
      links.forEach(link =>
        link.addEventListener('click', e => {
          e.preventDefault();
          history.push({
            pathname: link.pathname,
            state: {
              lastArticlePathname: displaytitle.innerText,
              lastArticleTitle: displaytitle.innerText
            }
          });
          return fn ? fn() : null;
        })
      );
    }
  }, [className, history, ref, article, loading, fn]);
}

export default useLinkMimic;
