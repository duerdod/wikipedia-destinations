import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import theme from '../Theme';

const CrumbContainer = styled.div`
  margin: 0 auto;
  padding: 5px;
  /* max-width: 300px; */
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Crumb = styled(Link)`
  font-size: 0.65rem;
  font-family: ${theme.titleFont};
  color: ${theme.color.secondary};

  &:not(:last-of-type) {
    &:after {
      content: '>';
      display: inline-block;
      margin: 0 0.2em;
    }
  }
`;

const Crumbs = () => {
  const { crumbs = [] } = useContext(GameContext);

  return (
    <CrumbContainer>
      {crumbs.map((crumb, i) => {
        return (
          <Crumb
            to={{
              pathname: `/wiki/${crumb}`
            }}
          >
            {i + 1} {crumb}
          </Crumb>
        );
      })}
    </CrumbContainer>
  );
};

export default Crumbs;
