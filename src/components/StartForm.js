import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

const Form = styled.form`
  display: flex;
  justify-content: center;

  input,
  button {
    color: ${theme.color.greyish};
    border: 2px solid ${theme.color.greyish};
    padding: 0.5rem 1rem;
    font-family: ${theme.titleFont};
    font-size: ${theme.fontSize.normal};
    transition: all ${p => p.theme.transition};
  }
  @media screen and (max-width: 40em) {
    display: block;
    padding: 1rem;
    input,
    button {
      display: block;
      width: 100%;
    }
    button {
      margin-top: -2px;
    }
  }
`;

const Input = styled.input`
  background: ${theme.background};
  &:focus {
    background: #ffffff;
  }
`;

const Button = styled.button`
  margin-left: -2px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: ${theme.background};
    background: ${theme.color.greyish};
  }
`;

function inputFormatter(rawInput) {
  return rawInput
    .replace(/(^|\s)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase())
    .replace(' ', '_');
}

const showFormOn = ['/', '/wiki', '/wiki/'];

const StartFrom = () => {
  const [rawInput, setInputValue] = useState('');
  const { setStartedFrom } = useContext(StatsContext);
  const location = useLocation();
  const { push } = useHistory();

  const handleChange = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = e => {
    const formattedInput = inputFormatter(rawInput);
    setStartedFrom(rawInput);
    e.preventDefault();
    push({
      pathname: `/wiki/${formattedInput}`
    });
  };

  return (
    showFormOn.includes(location.pathname) && (
      <Form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleChange} />
        <Button type="submit">Start</Button>
      </Form>
    )
  );
};

export default StartFrom;
