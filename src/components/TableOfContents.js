import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import theme from '../Theme';

import sanitizeTOC from '../helpers/sanitizeTOC';
import { animated, useTransition } from 'react-spring';

const Container = styled.ul`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
`;

const Link = styled.span`
  text-align: right;
  visibility: hidden;
  font-family: ${p => p.theme.titleFont};
  font-weight: 800;
`;

const LinkContainer = styled.li`
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  background: ${p => p.theme.color.red.tint[2]};
  width: 20px;
  white-space: nowrap;
  transition: all 0.2s ease;
  overflow: hidden;
  border-radius: 0 20px 20px 0;

  &:hover {
    width: 100%;
    overflow: visible;
    span {
      visibility: visible;
    }
  }

  a {
    span {
      margin: 0 10px 0 3px;
    }
  }
`;

const formatContent = contents => {
  const obj = sanitizeTOC(contents.innerHTML)
    .replace(/\n/g, '')
    .split(/(<\s*a[^>]*>(.*?)<\s*\/\s*a>)/g)
    .filter(Boolean)
    .filter(s => !s.startsWith(' '))
    .filter(s => !s.startsWith('<span>'))
    .map((a, i) => {
      return {
        key: i + 1,
        text: a.replace(/<span[^>]*>(\d+)<\/span>/gi, '')
      };
    });
  return obj;
};

const TableOfContents = ({ contents }) => {
  const [tocContent, setTocContent] = useState([]);
  useEffect(() => {
    if (contents) {
      const tocObj = formatContent(contents);
      if (tocObj) {
        setTocContent(tocObj);
      }
    }
  }, [contents]);

  return (
    <Container>
      {tocContent &&
        tocContent.map(toc => (
          <LinkContainer className="link" key={toc.key}>
            <Link dangerouslySetInnerHTML={{ __html: toc.text }} />
          </LinkContainer>
        ))}
    </Container>
  );
};

export default TableOfContents;
