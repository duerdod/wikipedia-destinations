import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { GameArticles, GameState } from '../lib/types';
import { mock } from './gameContextMock';

type GameAction =
  | { type: 'START_GAME'; usedRandomizer: boolean; isStarted: boolean; articles: GameArticles }
  | { type: 'INCREMENT_STEPS' }
  | { type: 'SET_CURRENT_ARTICLE'; pageid: number }
  | { type: 'IN_DESTINATION' };

const gameInit: GameState = {
  usedRandomizer: false,
  isStarted: false,
  articles: { start: null, destination: null },
  inDestination: false,
  currentPageId: 0,
  steps: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        usedRandomizer: action.usedRandomizer,
        isStarted: action.isStarted,
        articles: action.articles,
        inDestination: false,
      };
    case 'INCREMENT_STEPS':
      return { ...state, steps: state.steps + 1 };
    case 'SET_CURRENT_ARTICLE':
      return { ...state, currentPageId: action.pageid };
    case 'IN_DESTINATION':
      return { ...state, inDestination: true };
    default:
      return state;
  }
}

interface GameContextValue {
  crumbs: string[];
  gameState: GameState;
  startGame: (action: Extract<GameAction, { type: 'START_GAME' }>) => void;
  mergeCrumbs: (title: string) => void;
  incrementSteps: () => void;
  setCurrentPageid: (pageid: number) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [crumbs, setCrumbs] = useState<string[]>([]);
  const [gameState, dispatch] = useReducer(gameReducer, import.meta.env.DEV ? mock : gameInit);

  const mergeCrumbs = (title: string) => setCrumbs((prev) => [...prev, title]);
  const startGame = (action: Extract<GameAction, { type: 'START_GAME' }>) => dispatch(action);
  const setCurrentPageid = (pageid: number) => dispatch({ type: 'SET_CURRENT_ARTICLE', pageid });
  const incrementSteps = () => {
    if (gameState.isStarted) dispatch({ type: 'INCREMENT_STEPS' });
  };

  // When the current article is the destination, the game is won.
  const currentPageId = gameState.isStarted && gameState.currentPageId;
  useEffect(() => {
    if (currentPageId && gameState.currentPageId === gameState.articles.destination?.pageid) {
      dispatch({ type: 'IN_DESTINATION' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageId]);

  return (
    <GameContext.Provider
      value={{ crumbs, gameState, startGame, mergeCrumbs, incrementSteps, setCurrentPageid }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
