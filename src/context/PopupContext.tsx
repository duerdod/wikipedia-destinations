import { createContext, useContext, useState, type ReactNode } from 'react';

interface PopupContextValue {
  popupId: string;
  showPopup: (id: string) => void;
  hidePopup: () => void;
}

const PopupContext = createContext<PopupContextValue>({
  popupId: '',
  showPopup: () => {},
  hidePopup: () => {},
});

export function PopupProvider({ children }: { children: ReactNode }) {
  const [popupId, setPopupId] = useState('');

  return (
    <PopupContext.Provider
      value={{ popupId, showPopup: setPopupId, hidePopup: () => setPopupId('') }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup(): PopupContextValue {
  return useContext(PopupContext);
}
