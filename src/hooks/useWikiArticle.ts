import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { getArticle } from '../lib/wiki';

interface ArticleState {
  loading: boolean;
  error: string | null;
  title: string;
  html: string;
  pageid: number;
  disambiguation: boolean;
}

const EMPTY: ArticleState = {
  loading: true,
  error: null,
  title: '',
  html: '',
  pageid: 0,
  disambiguation: false,
};

/**
 * Load a cleaned article from our edge function, then run a final DOMPurify
 * pass in the browser before it's injected. Sanitising here — in the same DOM
 * the markup renders into — is the actual XSS boundary; the edge transform is
 * about shaping content, not security.
 */
export function useWikiArticle(title: string | undefined): ArticleState {
  const [state, setState] = useState<ArticleState>(EMPTY);

  useEffect(() => {
    if (!title) return;
    let cancelled = false;
    setState({ ...EMPTY, loading: true });

    getArticle(title)
      .then((article) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: null,
          title: article.title,
          html: DOMPurify.sanitize(article.html),
          pageid: article.pageid,
          disambiguation: article.disambiguation,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          ...EMPTY,
          loading: false,
          error: err instanceof Error ? err.message : 'error',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [title]);

  return state;
}
