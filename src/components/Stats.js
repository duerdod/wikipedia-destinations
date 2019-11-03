import React, { useContext } from 'react';
import styled from 'styled-components';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

const StepContainer = styled.div`
  h2,
  h3 {
    font-family: ${theme.titleFont};
    color: ${theme.color.red};
    text-align: center;
  }
`;

const StartFrom = styled.h3`
  font-size: 1rem;
  && {
    color: ${theme.color.greyish};
  }
`;

const Step = styled.h2`
  font-size: 6rem;
`;

const Stats = () => {
  const { steps, startedFrom } = useContext(StatsContext);

  return (
    <StepContainer>
      <StartFrom>Started from: {startedFrom}</StartFrom>
      <Step>{steps}</Step>
    </StepContainer>
  );
};

export default Stats;
