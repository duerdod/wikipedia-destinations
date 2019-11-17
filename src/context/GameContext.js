import React, { createContext, useState, useReducer, useEffect } from 'react';

const GameContext = createContext();

const gameInit = {
  usedRandomizer: false,
  isStarted: false,
  articles: {
    start: null,
    destination: null
  },
  inDestination: false,
  currentPageId: 0,
  steps: 0
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        usedRandomizer: action.usedRandomizer,
        isStarted: action.isStarted,
        articles: {
          start: action.articles.start,
          destination: action.articles.destination
        },
        inDestination: false
      };
    case 'INCREMENT_STEPS':
      return {
        ...state,
        steps: state.steps + 1
      };
    case 'SET_CURRENT_ARTICLE':
      return {
        ...state,
        currentPageId: action.pageid
      };
    case 'IN_DESTINATION':
      return {
        ...state,
        inDestination: true
      };
    default:
      return state;
  }
}

function GameProvider({ children }) {
  const [crumbs, setCrumbs] = useState([]);
  const [gameState, dispatch] = useReducer(gameReducer, gameInit);

  const mergeCrumbs = title => setCrumbs([...crumbs, title]);
  const dispatcher = action => dispatch(action);
  const startGame = action => dispatch(action);
  const setCurrentPageid = action =>
    dispatch({ type: 'SET_CURRENT_ARTICLE', pageid: action });

  const incrementSteps = () =>
    gameState.isStarted ? dispatch({ type: 'INCREMENT_STEPS' }) : false;

  // UGH
  const currentPageId = gameState.isStarted && gameState.currentPageId;
  const setInDestination = () => {
    if (gameState.currentPageId === gameState.articles.destination.pageid) {
      return dispatch({ type: 'IN_DESTINATION' });
    }
    return;
  };

  // UGH x2
  useEffect(() => {
    if (currentPageId) {
      setInDestination();
    }
    // eslint-disable-next-line
  }, [currentPageId]);

  return (
    <GameContext.Provider
      value={{
        crumbs,
        startGame,
        gameState,
        dispatcher,
        mergeCrumbs,
        incrementSteps,
        setInDestination,
        setCurrentPageid
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameProvider, GameContext };
