import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { StatsContext } from './StatsProvider';
import theme from '../Theme';

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 300px;

  input,
  button {
    color: ${theme.color.greyish};
    border: 2px solid ${theme.color.greyish};
    padding: 0.5rem 0.3rem;
    font-family: ${theme.titleFont};
    font-size: ${theme.fontSize.normal};
    transition: all ${p => p.theme.transition};
    width: 100%;
    border-radius: 0;
  }
  @media screen and (max-width: 40em) {
    display: block;
    padding: 1rem;
    input,
    button {
      display: block;
    }
    button {
    }
  }
`;

const Input = styled.input`
  background: ${theme.background};
  display: block;

  &:last-of-type {
    margin-top: -2px;
  }

  &:focus {
    background: #ffffff;
    &::placeholder {
      color: ${theme.color.greyish};
      opacity: 0.2;
    }
  }

  &::placeholder {
    color: ${theme.color.greyish};
    font-size: 0.6rem;
    text-transform: uppercase;
    opacity: 1;
  }
`;

const Button = styled.button`
  margin-top: -2px;
  text-transform: uppercase;
  font-weight: 800;
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

const StartForm = () => {
  const { setDestinations, initDestinations, checkValid } = useContext(
    StatsContext
  );
  const [raw, dispatch] = useReducer(formReducer, initDestinations);

  const location = useLocation();
  const { push } = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    if (!checkValid) return false;
    const formattedInput = inputFormatter(raw.start);
    setDestinations(raw);
    push({
      pathname: `/wiki/${formattedInput}`
    });
  };

  return (
    showFormOn.includes(location.pathname) && (
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Start</Button>
      </Form>
    )
  );
};

export default StartForm;
