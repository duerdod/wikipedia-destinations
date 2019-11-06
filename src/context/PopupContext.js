import React, { createContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === 'Escape') {
        return hidePopup();
      }
      return;
    }
    const [body] = document.getElementsByTagName('body');

    if (popupId) {
      body.classList.add('popup-open');
      body.addEventListener('keydown', closeOnEsc);
    } else {
      body.classList.remove('popup-open');
    }
    return () => {
      body.classList.remove('popup-open');
      body.removeEventListener('keydown', closeOnEsc);
    };
  }, [popupId]);

  return (
    <PopupContext.Provider value={{ popupId, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export { PopupProvider, PopupContext };
