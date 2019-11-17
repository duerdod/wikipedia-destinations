import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import theme from '../Theme';
import getWikiArticle from '../helpers/getWikiArticle';
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

  ${({ loading }) =>
    loading &&
    `
    border: 2px solid ${theme.color.blue.tint[7]};
    button {
    background: ${theme.color.blue.tint[7]};
      &:hover {
        background: ${theme.color.blue.hex};
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

const formInit = {
  start: '',
  destination: '',
  randomized: false,
  randomArticle: null,
  loading: false,
  error: false
};

function formReducer(state, action) {
  const {
    start,
    destination = '',
    randomized = false,
    randomArticle = null
  } = action;
  switch (action.type) {
    case 'start':
      return { ...state, start };
    case 'destination':
      return { ...state, destination, randomized, randomArticle };
    case 'status': {
      const { loading = false, error = false } = action;
      return { ...state, loading, error };
    }
    default:
      return state;
  }
}

const StartForm = () => {
  const [formState, dispatch] = useReducer(formReducer, formInit);
  const { startGame } = useContext(GameContext);
  const { pathname } = useLocation();
  const history = useHistory();
  const {
    start,
    destination,
    randomArticle,
    randomized,
    error,
    loading
  } = formState;

  const fetchArticle = async e => await getWikiArticle(e);

  const handleSubmit = async e => {
    e.preventDefault();

    const startArticle = await fetchArticle(start);
    const destiantionArticle = await fetchArticle(destination);

    startGame({
      type: 'START_GAME',
      startTitle: start,
      isStarted: true,
      usedRandomizer: randomized,
      articles: {
        start: startArticle,
        destination: destiantionArticle
      }
    });

    history.push({
      pathname: `/wiki/${start}`
    });
  };

  const handleChange = e =>
    dispatch({ type: e.target.name, [e.target.name]: e.target.value });

  const handleBlur = async e => {
    dispatch({ type: 'status', loading: true });
    const { value } = e.target;

    const { pageid } = await fetchArticle(value);
    if (!pageid) {
      return dispatch({ type: 'status', error: true });
    }

    return dispatch({ type: 'status' });
  };

  const handleRandomizer = async e => {
    e.preventDefault();
    dispatch({ type: 'status', loading: true });

    const article = await fetchArticle(null);

    // WHY!!!!!
    dispatch({ type: 'status', loading: false });
    dispatch({
      type: 'destination',
      randomArticle: article,
      destination: article.title,
      randomized: true
    });
  };

  const resetDestination = () => dispatch({ type: 'destination' });
  const setAsDestination = destination =>
    dispatch({ type: 'destination', destination });

  const randomArticleProps = {
    ...randomArticle,
    show: randomized,
    resetDestination,
    setAsDestination
  };

  return (
    showFormOn.includes(pathname) && (
      <>
        <Form error={error} loading={loading} onSubmit={handleSubmit}>
          <Input
            required
            name="start"
            placeholder="Depature from"
            type="text"
            value={formState.start}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            required
            name="destination"
            placeholder="Bound for"
            type="text"
            value={formState.destination}
            onChange={handleChange}
          />
          <ButtonContainer>
            <Button disabled={error || loading} type="submit">
              Start
            </Button>
            <Button
              disabled={error || loading}
              type="submit"
              onClick={handleRandomizer}
            >
              Random destination
            </Button>
          </ButtonContainer>
        </Form>
        {error && <Error title="No such depature :(" />}
        {randomized && <RandomArticle {...randomArticleProps} />}
      </>
    )
  );
};

export default StartForm;
