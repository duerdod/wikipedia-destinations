import React from 'react';
import useWikiFetch from '../hooks/useWikiFetch';
import styled from 'styled-components';

const StyledArticle = styled.div`
  padding: 0 5rem;
  b {
    display: block;
    font-size: 2rem;
  }
`;

const Article = () => {
  const { loading, content, pages, links } = useWikiFetch('Bandy');
  if (loading) return <p>Loading...</p>;

  console.log(links);

  return <StyledArticle dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Article;
