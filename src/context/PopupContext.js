import React, { createContext, useState } from 'react';

const PopupContext = createContext({
  popupId: '',
  isOpen: Boolean,
  showPopup: () => {},
  hidePopup: () => {}
});

function PopupProvider({ children }) {
  const [popupId, setPopupId] = useState('');

  const showPopup = id => setPopupId(id);
  const hidePopup = () => setPopupId('');

  return (
    <PopupContext.Provider value={{ popupId, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export { PopupProvider, PopupContext };
