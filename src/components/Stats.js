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
  border: 3px solid ${p => p.theme.color.primary};
  border-radius: 7px;
  padding: 2.5rem 2rem 3rem 2rem;
  max-width: 460px;
  margin: 0 auto 2rem auto;
  background: #ffffff;
  /* box-shadow: 0 0 7px #F14173; */

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
    color: ${theme.color.primary};
    background: #ffffff;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1.1rem;
    top: -14px;
    padding: 0 0.3rem;
    border: 2px solid;
    border-image: linear-gradient(to bottom, ${p =>
      p.theme.color.primary} 50%, ${p =>
  p.theme.color.primary} 51%, #ffffff 51%, #ffffff 100%);
    border-image-slice: 1;
    border-width: 3px;
  }

  h2,
  h3 {
    font-family: ${theme.titleFont};
    color: ${theme.color.primary};
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
