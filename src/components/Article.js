import React from 'react';
import useFetch from '../hooks/useFetch';
import sanitize from '../helpers/sanitizeHtml';
import styled from 'styled-components';

const StyledArticle = styled.div`
  padding: 0 5rem;
  b {
    display: block;
    font-size: 2rem;
  }
`;

const Article = () => {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&titles=belgrade&prop=extracts&origin=*&format=json';
  const { loading, pages } = useFetch(url);
  if (loading) return <p>Loading...</p>;

  const clean = sanitize(pages[55904].extract);

  return <StyledArticle dangerouslySetInnerHTML={{ __html: clean }} />;
};

export default Article;
