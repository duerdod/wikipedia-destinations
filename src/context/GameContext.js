import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import getWikiArticle from '../helpers/getWikiArticle';

const GameContext = createContext();

const initDestinations = {
  start: '',
  destination: ''
};

function GameProvider({ children }) {
  const [steps, setStep] = useState(0);
  const [crumbs, setCrumbs] = useState([]);
  const [destinations, setDestinations] = useState(initDestinations);
  const [isDestination, setIsDestination] = useState(false);

  const { pathname } = useLocation();

  const incrementSteps = () => setStep(step => step + 1);
  const checkValid = obj => Object.keys(obj).some(key => obj[key].length < 1);
  const mergeCrumbs = title => setCrumbs([...crumbs, title]);
  const fetchRandomArticle = async () => {
    const randomArticle = await getWikiArticle();
    return randomArticle;
  };

  useEffect(() => {
    // Hell of a work around until we've the article context working.
    const inDestination = pathname
      .replace('/wiki/', '')
      .replace(/(^|\s)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
      .replace('_', ' ');

    if (inDestination === destinations.destination) {
      return setIsDestination(true);
    }
  }, [pathname, destinations.destination]);

  return (
    <GameContext.Provider
      value={{
        steps,
        crumbs,
        pathname,
        checkValid,
        mergeCrumbs,
        destinations,
        isDestination,
        incrementSteps,
        setDestinations,
        initDestinations,
        fetchRandomArticle
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameProvider, GameContext };
