import React from 'react';
import styled from 'styled-components';
import useWikiFetch from '../hooks/useWikiFetch';

const ErrorMessage = styled.h2`
  text-align: center;
  margin: 3rem 0;
  font-family: ${p => p.theme.titleFont};
  font-weight: 800;
`;

const Error = ({ title }) => {
  return (
    <>
      <ErrorMessage>{title}</ErrorMessage>
      <span></span>
    </>
  );
};

export default Error;
