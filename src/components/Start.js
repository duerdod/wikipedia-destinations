import React, { useReducer, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import theme from '../Theme';
import useWikiFetch from '../hooks/useWikiFetch';
import Error from './Error';

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  border: 2px solid ${p => p.theme.color.secondary};

  input,
  button {
    /* border: 2px solid ${p => p.theme.color.white}; */
    padding: 0.5rem 0.4rem;
    font-family: ${theme.titleFont};
    font-size: ${theme.fontSize.normal};
    transition: all ${p => p.theme.transition};
    width: 100%;
    border-radius: 0;
  }
  @media screen and (max-width: 40em) {
    display: block;
    input,
    button {
      display: block;
    }
    button {
    }
  }

  ${({ disabled }) =>
    disabled &&
    `
    border: 2px solid ${theme.color.primary};
    button {
    background: ${theme.color.primary};
    }
  `}
`;

const Input = styled.input`
  background: ${theme.color.white};
  display: block;

  &:last-of-type {
    border-top: 1px solid #eeeeee;
    margin-top: -2px;
  }

  &:focus {
    background: #ffffff;
    &::placeholder {
      color: ${theme.color.background};
    }
  }

  &::placeholder {
    color: ${theme.color.background};
    font-size: 0.6rem;
    text-transform: uppercase;
    opacity: 1;
  }
`;

const Button = styled.button`
  margin-top: -2px;
  text-transform: uppercase;
  font-weight: 800;
  background: ${theme.color.secondary};
  color: ${theme.color.background};
  cursor: pointer;
  &:hover {
    background: #fbcea7;
  }
`;

function inputFormatter(rawInput) {
  return rawInput
    .replace(/(^|\s)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase())
    .replace(' ', '_');
}

const showFormOn = ['/', '/wiki', '/wiki/'];

function formReducer(state, action) {
  switch (action.type) {
    case 'START':
      const { start } = action;
      return { ...state, start };
    case 'DESTINATION':
      const { destination } = action;
      return { ...state, destination };
    default:
      return state;
  }
}

const Start = () => {
  const { setDestinations, initDestinations, checkValid } = useContext(
    GameContext
  );
  const [raw, dispatch] = useReducer(formReducer, initDestinations);
  const [customError, setCustomError] = useState(false);
  const location = useLocation();
  const { push } = useHistory();
  const { destination } = raw;

  const { error, loading } = false;

  const handleSubmit = e => {
    e.preventDefault();
    if (!checkValid && error !== null) return false;
    const formattedInput = inputFormatter(raw.start);
    setDestinations(raw);
    push({
      pathname: `/wiki/${formattedInput}`
    });
  };

  useEffect(() => {});

  return (
    showFormOn.includes(location.pathname) && (
      <>
        <Form disabled={loading || customError} onSubmit={handleSubmit}>
          <Input
            required
            name="start"
            placeholder="Depature from"
            type="text"
            onChange={e => dispatch({ type: 'START', start: e.target.value })}
          />
          <Input
            required
            name="destination"
            placeholder="Bound for"
            type="text"
            onChange={e =>
              dispatch({ type: 'DESTINATION', destination: e.target.value })
            }
          />
          <Button type="submit" disabled={loading || customError}>
            Start
          </Button>
        </Form>
        {customError ? <Error title="No such destination :(" /> : null}
      </>
    )
  );
};

export default Start;
