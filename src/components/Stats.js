import React, { useContext } from 'react';
import styled from 'styled-components';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

const OuterContainer = styled.section`
  text-transform: uppercase;
  text-align: center;
  position: relative;
  z-index: 1;

  .outer {
    border-radius: 6px;
    color: ${theme.color.background};
    padding: 3px 3px 0 3px;
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -22px;
    background-image: linear-gradient(
      to bottom,
      ${p => p.theme.color.primary} 51%,
      ${p => p.theme.color.primary} 71%,
      ${p => p.theme.color.white} 72%,
      ${p => p.theme.color.white} 100%
    );
    .inner {
      background: ${theme.color.white};
      border-radius: 3px;
      padding: 0.2rem 0.7rem 0 0.7rem;
      font-family: ${theme.titleFont};
      font-weight: 800;
      font-size: 1.5rem;
    }
  }
`;

const InnerContainer = styled.div`
  border: 3px solid ${p => p.theme.color.primary};
  border-radius: 7px;
  padding: 2.5rem 2rem 3rem 2rem;
  max-width: 460px;
  margin: 1rem auto;
  background: ${theme.color.white};

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  position: relative;

  h2,
  h3 {
    font-family: ${theme.titleFont};
    text-transform: uppercase;
    font-weight: 800;
  }

  @media screen and (max-width: 40em) {
  }
`;

const Destinations = styled.h3`
  font-size: 1rem;
  padding: 0 1rem;
  color: ${theme.color.background};
  && {
  }
`;

const Destination = styled.div``;

const Step = styled.h2`
  font-size: 6rem;
  padding: 0 1rem;
  line-height: 0;
  position: relative;
  color: ${theme.color.primary};
  &:after {
    display: block;
    content: 'Steps';
    font-size: 0.7rem;
    color: ${theme.color.primary};
    position: absolute;
    top: 43px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Reset = styled.a`
  color: ${theme.color.secondary};
  font-family: ${theme.titleFont};
  font-size: 0.65rem;
  margin-bottom: 2rem;
`;

const Stats = () => {
  const {
    steps,
    location: { pathname },
    destinations: { start, destination }
  } = useContext(StatsContext);

  return (
    <OuterContainer>
      <div className="outer">
        <div className="inner">Yo scores</div>
      </div>
      <InnerContainer>
        <Destinations>
          Depature
          <Destination>{start}</Destination>
        </Destinations>
        <Step>{steps}</Step>
        <Destinations>
          Bound
          <Destination>{destination}</Destination>
        </Destinations>
      </InnerContainer>
      {pathname !== '/' && <Reset href="/">Start over</Reset>}
    </OuterContainer>
  );
};

export default Stats;
