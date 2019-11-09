import React, { useReducer, useContext, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import theme from '../Theme';
// import useWikiFetch from '../hooks/useWikiFetch';
import RandomArticle from './RandomArticle';
import { inputFormatter } from '../helpers/formatInput';
import Error from './Error';

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  border: 2px solid ${p => p.theme.color.beige.hex};

  input,
  button {
    padding: 0.5rem 0.4rem;
    font-family: ${theme.titleFont};
    font-size: ${theme.fontSize.normal};
    transition: all ${p => p.theme.transition};
    width: 100%;
    border-radius: 0;
    display: flex;
    align-content: center;
    justify-content: center;
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

  ${({ error }) =>
    error &&
    `
    border: 2px solid ${theme.color.red.hex};
    button {
    background: ${theme.color.red.hex};
      &:hover {
        background: ${theme.color.red.hex};
      }
    }
  `}
`;

const Input = styled.input`
  background: ${theme.color.white.hex};
  display: block;
  && {
    padding: 1rem 0.4rem;
    font-size: 1rem;
  }

  &:last-of-type {
    border-top: 1px solid #eeeeee;
    margin-top: -2px;
  }

  &:focus {
    background: #ffffff;
    &::placeholder {
      color: ${theme.color.blue.hex};
    }
  }

  &::placeholder {
    color: ${theme.color.blue.hex};
    font-size: 0.6rem;
    text-transform: uppercase;
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${theme.color.beige.hex};
  border-radius: 6px 0 6px 6px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-top: -2px;
  text-transform: uppercase;
  font-weight: 800;
  background: ${theme.color.beige.hex};
  color: ${theme.color.blue.hex};
  cursor: pointer;
  &:hover {
    background: ${theme.color.beige.tint[2]};
  }
`;

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
  const {
    setDestinations,
    initDestinations,
    checkValid,
    fetchArticle
  } = useContext(GameContext);

  const [raw, dispatch] = useReducer(formReducer, initDestinations);
  const [articleState, setArticleState] = useState({
    loading: false,
    error: false,
    random: null,
    askedFor: null
  });
  const { pathname } = useLocation();
  const { push } = useHistory();
  const { loading, error, random } = articleState;

  const handleSubmit = e => {
    e.preventDefault();
    if (!checkValid) return false;
    const formattedInput = inputFormatter(raw.start);
    setDestinations(raw);
    push({
      pathname: `/wiki/${formattedInput}`
    });
  };

  const handleBlur = async e => {
    e.preventDefault();
    const { value } = e.target;
    setArticleState({ ...articleState, loading: true });
    if (value.length < 1) {
      return setArticleState({ ...articleState, error: false, loading: false });
    }
    const { pageid } = await fetchArticle(value);
    if (!pageid) {
      return setArticleState({ ...articleState, error: true, loading: false });
    }
    setArticleState({ ...articleState, error: false, loading: false });
  };

  const handleRandomizer = async e => {
    e.preventDefault();
    setArticleState({ ...articleState, loading: true });
    const article = await fetchArticle(null);
    setArticleState({ ...articleState, loading: false, random: article });
  };

  return (
    showFormOn.includes(pathname) && (
      <>
        <Form error={loading || error} onSubmit={handleSubmit}>
          <Input
            required
            name="start"
            placeholder="Depature from"
            type="text"
            value={raw.start}
            onBlur={handleBlur}
            onChange={e => dispatch({ type: 'START', start: e.target.value })}
            error={error}
          />
          <Input
            required
            name="destination"
            placeholder="Bound for"
            type="text"
            value={raw.destination}
            onChange={e =>
              dispatch({ type: 'DESTINATION', destination: e.target.value })
            }
          />
          <ButtonContainer>
            <Button type="submit" disabled={loading || error}>
              Start
            </Button>

            <Button type="button" onClick={handleRandomizer} disabled={loading}>
              Random destination
            </Button>
          </ButtonContainer>
        </Form>
        {random && random.title.length ? (
          <RandomArticle
            show={random !== null}
            dispatch={dispatch}
            setArticleState={setArticleState}
            articleState={articleState}
            {...random}
          />
        ) : null}

        {error ? <Error title="No such depature :(" /> : null}
      </>
    )
  );
};

export default Start;
