import React from 'react';
import styled from 'styled-components';
import useWikiFetch from '../hooks/useWikiFetch';
import { Container } from './Article';

const ErrorMessage = styled.h2`
  text-align: center;
  margin: 3rem 0;
  font-family: ${p => p.theme.titleFont};
`;

const Error = ({ children, article }) => {
  const { loading, error } = useWikiFetch(article);

  if (!loading && error) {
    return (
      <Container>
        <ErrorMessage>Wikipedia says: {error}</ErrorMessage>
      </Container>
    );
  }

  return children;
};

export default Error;
