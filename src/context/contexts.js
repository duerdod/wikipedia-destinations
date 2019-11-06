import React from 'react';
import { GameProvider } from './GameContext';
import { PopupProvider } from './PopupContext';

function AppProvider({ children }) {
  return (
    <PopupProvider>
      <GameProvider>{children}</GameProvider>
    </PopupProvider>
  );
}

export default AppProvider;
