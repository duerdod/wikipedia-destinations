import React, { createContext, useState } from 'react';

const PopupContext = createContext();

function PopupProvider({ children }) {
  const [showPopup, setShow] = useState(false);

  const setShowPopup = () => {
    setShow(show => !show);
  };
  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export { PopupProvider, PopupContext };
