import React, { useRef, useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import useWikiFetch from '../hooks/useWikiFetch';
import useLinkMimic from '../hooks/useLinkMimic';
import useAnchorScroll from '../hooks/useAnchorScroll';
import { GameContext } from '../context/GameContext';
import theme from '../Theme';
import Error from './Error';
import Bound from './Bound';
import TableOfContents from './TableOfContents';

export const Container = styled.div`
  padding: 0 1.7rem;
  max-width: 650px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
  font-family: ${theme.titleFont};
  color: ${theme.color.beige.hex};
  font-weight: 800;
`;

const TOC = css`
  &&& #toc {
    /* position: absolute; */

    ul {
      margin: 0;
      li {
        list-style: none;
      }
    }
  }
`;

const StyledArticle = styled.div`
  overflow-wrap: break-word;

  p {
    margin: 0.5em 0;
    line-height: 1.6;
    font-size: 1rem;
  }

  a {
    color: ${theme.color.beige.hex};
  }

  h3,
  h4 {
    font-family: ${theme.titleFont};
    line-height: 1.6;
    font-size: 1.2rem;
    color: ${theme.color.beige.hex};
    font-weight: 800;
  }
  h1,
  h2 {
    font-family: ${theme.titleFont};
    font-size: 2rem;
    font-weight: 800;
    color: ${theme.color.beige.hex};
  }

  ul,
  ol {
    margin: 1rem;
    li {
      margin-bottom: 0.5rem;
      list-style: disc;
    }
  }
  ${TOC}
`;

const LoadingBox = styled.div`
  background: #042a44;
  height: 3rem;
  width: 40%;
  margin: 1rem 0;
  &.text {
    width: 100%;
    height: 20rem;
  }
`;

const LoadingComponent = () => (
  <>
    <LoadingBox />
    <LoadingBox className="text" />
  </>
);

// const isDev = process.env.NODE_ENV === 'development';

const Article = () => {
  const { article } = useParams();
  const { pathname } = useLocation();
  const [tocNode, setTocNode] = useState(null);
  const articleRef = useRef();

  const {
    incrementSteps,
    mergeCrumbs,
    setCurrentPageid,
    gameState: { inDestination }
  } = useContext(GameContext);

  const { loading, error, content, displaytitle, pageid } = useWikiFetch(
    article
  );

  useLinkMimic({
    ref: articleRef,
    className: 'fetched-article',
    loading
  });

  useAnchorScroll();

  useEffect(() => {
    setCurrentPageid(pageid);
    // eslint-disable-next-line
  }, [pageid]);

  useEffect(() => {
    const TOC = document.getElementById('toc');
    if (TOC) {
      setTocNode(TOC);
      TOC.remove();
    }
  }, [pageid]);

  // Used for incrementing on back click.
  useEffect(() => {
    incrementSteps();
    if (displaytitle) {
      mergeCrumbs(displaytitle);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      {inDestination ? <Bound /> : null}
      <Container ref={articleRef}>
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <Error title="Are you lost?" />
        ) : (
          <>
            {/* <TableOfContents contents={tocNode} /> */}
            <Title>{displaytitle}</Title>
            <StyledArticle
              className="fetched-article"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Article;
