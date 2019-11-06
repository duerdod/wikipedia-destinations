import React, { createContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useWikiFetch from '../hooks/useWikiFetch';

const ArticleContext = createContext();

function ArticleProvider({ children }) {
  const { article } = useParams();
  const location = useLocation();

  const { loading, error, content, displaytitle } = useWikiFetch(article);

  return (
    <ArticleContext.Provider
      value={{ loading, error, content, displaytitle, article, location }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export { ArticleProvider, ArticleContext };
