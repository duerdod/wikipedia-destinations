import React, { createContext, useState } from 'react';

const StatsContext = createContext();

function StatsProvider({ children }) {
  const [steps, setStep] = useState(0);
  const [crumbs, setCrumbs] = useState({});

  function incrementSteps() {
    setStep(step => step + 1);
  }

  return (
    <StatsContext.Provider value={{ steps, incrementSteps, crumbs, setCrumbs }}>
      {children}
    </StatsContext.Provider>
  );
}

export { StatsProvider, StatsContext };
