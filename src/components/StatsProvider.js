import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StatsContext = createContext();

const initDestinations = { start: '', destination: '' };

function StatsProvider({ children }) {
  const [steps, setStep] = useState(0);
  const [crumbs, setCrumbs] = useState({});
  const [shouldRedirectToStart, setShouldRedirect] = useState(false);
  const [destinations, setDestinations] = useState(initDestinations);

  const location = useLocation();

  const incrementSteps = () => setStep(step => step + 1);
  const checkValid = obj => Object.keys(obj).some(key => obj[key].length < 1);

  useEffect(() => {
    if (checkValid(destinations) && location.pathname.includes('/wiki')) {
      return setShouldRedirect(true);
    }
    return setShouldRedirect(false);
  }, [destinations, location.pathname]);

  return (
    <StatsContext.Provider
      value={{
        steps,
        crumbs,
        location,
        setCrumbs,
        checkValid,
        destinations,
        incrementSteps,
        setDestinations,
        initDestinations,
        shouldRedirectToStart
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export { StatsProvider, StatsContext };
