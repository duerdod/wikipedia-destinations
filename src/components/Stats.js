import React, { useContext } from 'react';
import styled from 'styled-components';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

const OuterContainer = styled.section`
  margin-bottom: 2rem;
  /* display: flex; */
  /* justify-content: center; */
`;

const InnerContainer = styled.div`
  border: 3px solid ${p => p.theme.color.greyish};
  border-radius: 7px;
  padding: 2rem 2rem 3rem 2rem;
  max-width: 460px;
  margin: 0 auto 2rem auto;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center; 
  position: relative;

  &:before {
    display: inline-block;
    content: '${p => p.title}';
    position: absolute;
    font-family: ${theme.titleFont};
    color: ${theme.color.red};
    background: ${theme.background};
    text-transform: uppercase;
    font-weight: 800;
    top: -11px;
    border-radius: 100%;
    padding: 0 0.3rem;
  }

  h2,
  h3 {
    font-family: ${theme.titleFont};
    color: ${theme.color.red};
    text-transform: uppercase;
    font-weight: 800;
  }

  @media screen and (max-width: 40em) {
    /* grid-template-columns: 2fr 1fr 2fr; */
  }

`;

const Destinations = styled.h3`
  font-size: 1rem;
  padding: 0 1rem;
  && {
    color: ${theme.color.greyish};
  }
`;

const Destination = styled.div``;

const Step = styled.h2`
  font-size: 6rem;
  padding: 0 1rem;
  line-height: 0;
  position: relative;
  &:after {
    display: block;
    content: 'Steps';
    font-size: 0.7rem;
    color: ${theme.color.greyish};
    position: absolute;
    top: 43px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Stats = () => {
  const {
    steps,
    destinations: { start, destination }
  } = useContext(StatsContext);

  return (
    <OuterContainer>
      <InnerContainer title="Yo Score">
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
    </OuterContainer>
  );
};

export default Stats;
