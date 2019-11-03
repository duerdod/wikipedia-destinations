import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useWikiFetch from '../hooks/useWikiFetch';
import useLinkMimic from '../hooks/useLinkMimic';
import { StatsContext } from './StatsProvider';

const Container = styled.div`
  padding: 0 1rem;
  max-width: 650px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const StyledArticle = styled.div`
  overflow-wrap: break-word;
  font-size: 0.875em;
  line-height: 1.6;
  font-size: 1rem;

  p {
    margin: 0.5em 0;
  }
  a {
    color: brown;
  }

  li {
  }

  ul,
  ol {
    list-style-type: disc;
  }
`;

const LoadingBox = styled.div`
  background: #f5f5f5;
  height: 3rem;
  width: 40%;
  margin: 1rem 0;
  &.text {
    width: 100%;
    height: 20rem;
  }
`;

const LoadingComponenet = () => (
  <>
    <LoadingBox />
    <LoadingBox className="text" />
  </>
);

const Article = () => {
  const { article } = useParams();
  const { incrementSteps } = useContext(StatsContext);
  const { loading, content, displaytitle } = useWikiFetch(article);
  const articleRef = useRef();

  useLinkMimic({
    ref: articleRef,
    className: 'fetched-article',
    loading,
    fn: incrementSteps
  });

  return (
    <Container ref={articleRef}>
      {loading ? (
        <LoadingComponenet />
      ) : (
        <>
          <Title>{displaytitle}</Title>
          <StyledArticle
            className="fetched-article"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </>
      )}
    </Container>
  );
};

export default Article;
