import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import useWikiFetch from '../hooks/useWikiFetch';
import useLinkMimic from '../hooks/useLinkMimic';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

export const Container = styled.div`
  padding: 0 1rem;
  max-width: 650px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
  font-family: ${theme.titleFont};
  color: ${theme.color.titleColor};
  font-weight: 800;
`;

const StyledArticle = styled.div`
  overflow-wrap: break-word;

  p {
    margin: 0.5em 0;
    line-height: 1.6;
    font-size: 1rem;
    /* color: ${theme.color.greyish}; */
  }

  a {
    color: ${theme.color.secondary};
  }

  h3,
  h4 {
    font-family: ${theme.titleFont};
    line-height: 1.6;
    font-size: 1.2rem;
    color: ${theme.color.titleColor};
    font-weight: 800;
  }
  h1,
  h2 {
    font-family: ${theme.titleFont};
    font-size: 2rem;
    font-weight: 800;
    color: ${theme.color.titleColor};
  }

  ul,
  ol {
    list-style-type: disc;

    li {
    }
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

const isDev = process.env.NODE_ENV === 'development';

const Article = () => {
  const { article } = useParams();
  const location = useLocation();
  const { incrementSteps, shouldRedirectToStart } = useContext(StatsContext);
  const { loading, content, displaytitle } = useWikiFetch(article);
  const articleRef = useRef();

  useLinkMimic({
    ref: articleRef,
    className: 'fetched-article',
    loading,
    fn: null
  });

  // eslint-disable-next-line
  useEffect(() => incrementSteps, [location.pathname]);

  if (!isDev) {
    if (shouldRedirectToStart) {
      return <Redirect to="/" />;
    }
  }

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
