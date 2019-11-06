import React, { createContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
  const { article } = useParams();
  // console.log(article);

  const incrementSteps = () => setStep(step => step + 1);
  const checkValid = obj => Object.keys(obj).some(key => obj[key].length < 1);
  const mergeCrumbs = title => setCrumbs([...crumbs, title]);

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
        initDestinations
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameProvider, GameContext };
