import React, { useContext } from 'react';
import styled from 'styled-components';
import { StatsContext } from './StatsProvider';

const Step = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

const Stats = () => {
  const { steps } = useContext(StatsContext);

  return <Step>{steps}</Step>;
};

export default Stats;
