import React, { createContext, useState } from 'react';

const StatsContext = createContext();

function StatsProvider({ children }) {
  const [steps, setStep] = useState(0);
  const [crumbs, setCrumbs] = useState({});
  const [startedFrom, setStartedFrom] = useState('');
  function incrementSteps() {
    setStep(step => step + 1);
  }

  return (
    <StatsContext.Provider
      value={{
        steps,
        incrementSteps,
        crumbs,
        setCrumbs,
        startedFrom,
        setStartedFrom
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export { StatsProvider, StatsContext };
