import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { usePopup } from '../context/PopupContext';
import { getArticle, getSummary } from '../lib/wiki';
import { parseDisambiguation, type DisambigOption } from '../lib/disambiguation';
import type { WikiSummary } from '../lib/types';
import DisambiguationPopup from './DisambiguationPopup';
import RandomArticle from './RandomArticle';
import Error from './Error';

interface FormState {
  start: string;
  destination: string;
  randomized: boolean;
  randomArticle: WikiSummary | null;
  loading: boolean;
  error: boolean;
  disambigOptions: DisambigOption[];
}

type FormAction =
  | { type: 'start'; start: string }
  | { type: 'destination'; destination?: string; randomized?: boolean; randomArticle?: WikiSummary | null }
  | { type: 'status'; loading?: boolean; error?: boolean }
  | { type: 'disambig'; options: DisambigOption[] };

const formInit: FormState = {
  start: '',
  destination: '',
  randomized: false,
  randomArticle: null,
  loading: false,
  error: false,
  disambigOptions: [],
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'start':
      return { ...state, start: action.start };
    case 'destination':
      return {
        ...state,
        destination: action.destination ?? '',
        randomized: action.randomized ?? false,
        randomArticle: action.randomArticle ?? null,
      };
    case 'status':
      return { ...state, loading: action.loading ?? false, error: action.error ?? false };
    case 'disambig':
      return { ...state, disambigOptions: action.options };
    default:
      return state;
  }
}

const INPUT =
  'block w-full bg-paper px-[0.4rem] py-4 text-base text-ink placeholder:text-[0.6rem]' +
  ' placeholder:uppercase placeholder:text-blue-0 focus:bg-white [&:last-of-type]:-mt-0.5' +
  ' [&:last-of-type]:border-t [&:last-of-type]:border-[#eee]';

const ACTION =
  'flex flex-1 cursor-pointer items-center justify-center bg-beige-0 px-[0.4rem] py-2' +
  ' font-title text-base font-extrabold uppercase text-blue-0 transition-all' +
  ' hover:bg-beige-2 disabled:cursor-default disabled:opacity-70';

export default function StartForm() {
  const [form, dispatch] = useReducer(formReducer, formInit);
  const { startGame } = useGame();
  const { showPopup, hidePopup } = usePopup();
  const navigate = useNavigate();
  const { start, destination, randomArticle, randomized, error, loading, disambigOptions } = form;

  // Actually start the game with a specific (non-ambiguous) departure article.
  const beginGame = async (startTitle: string, path: string) => {
    const [startArticle, destinationArticle] = await Promise.all([
      getSummary(startTitle),
      getSummary(destination),
    ]);
    startGame({
      type: 'START_GAME',
      isStarted: true,
      usedRandomizer: randomized,
      articles: { start: startArticle, destination: destinationArticle },
    });
    navigate(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'status', loading: true });

    const summary = await getSummary(start);
    if (!summary.pageid) {
      dispatch({ type: 'status', error: true });
      return;
    }

    // An ambiguous departure: let the player pick a meaning before starting.
    if (summary.type === 'disambiguation') {
      const { html } = await getArticle(start);
      const options = parseDisambiguation(html);
      if (options.length > 0) {
        dispatch({ type: 'disambig', options });
        dispatch({ type: 'status' });
        showPopup('disambiguation');
        return;
      }
      // Flagged but nothing parseable — just start on it.
    }

    dispatch({ type: 'status' });
    await beginGame(start, `/wiki/${start}`);
  };

  const chooseDisambiguation = (option: DisambigOption) => {
    hidePopup();
    dispatch({ type: 'start', start: option.title });
    beginGame(option.title, option.href);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'start') dispatch({ type: 'start', start: value });
    else dispatch({ type: 'destination', destination: value });
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length < 1) return dispatch({ type: 'status' });
    dispatch({ type: 'status', loading: true });
    const { pageid } = await getSummary(value);
    dispatch({ type: 'status', error: !pageid });
  };

  const handleRandomizer = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'status', loading: true });
    const article = await getSummary(null);
    dispatch({ type: 'status' });
    dispatch({
      type: 'destination',
      randomArticle: article,
      destination: article.title,
      randomized: true,
    });
  };

  const borderColor = error ? 'border-red-0' : loading ? 'border-blue-7' : 'border-beige-0';

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`mx-auto w-full max-w-[300px] border-2 ${borderColor}`}
      >
        <input
          required
          name="start"
          type="text"
          placeholder="Departure from"
          value={start}
          onChange={handleChange}
          onBlur={handleBlur}
          className={INPUT}
        />
        <input
          required
          name="destination"
          type="text"
          placeholder="Bound for"
          value={destination}
          onChange={handleChange}
          className={INPUT}
        />
        <div className="flex justify-around rounded-b-md bg-beige-0">
          <button type="submit" disabled={error || loading} className={ACTION}>
            Start
          </button>
          <button type="button" disabled={loading} onClick={handleRandomizer} className={ACTION}>
            Random destination
          </button>
        </div>
      </form>

      {error && <Error title="No such departure :(" />}

      {disambigOptions.length > 0 && (
        <DisambiguationPopup
          title={start}
          options={disambigOptions}
          onSelect={chooseDisambiguation}
        />
      )}

      {randomized && randomArticle && (
        <RandomArticle
          title={randomArticle.title}
          description={randomArticle.description}
          extract={randomArticle.extract}
          thumbnail={randomArticle.thumbnail}
          resetDestination={() => dispatch({ type: 'destination' })}
          setAsDestination={(title) => dispatch({ type: 'destination', destination: title })}
        />
      )}
    </>
  );
}
