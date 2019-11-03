import React, { useContext } from 'react';
import styled from 'styled-components';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

const Step = styled.h2`
  font-size: 5rem;
  text-align: center;
  font-family: ${theme.titleFont};
  color: ${theme.color.red};
`;

const Stats = () => {
  const { steps } = useContext(StatsContext);

  return <Step>{steps}</Step>;
};

export default Stats;
