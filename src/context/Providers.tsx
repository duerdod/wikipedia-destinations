import type { ReactNode } from 'react';
import { GameProvider } from './GameContext';
import { PopupProvider } from './PopupContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PopupProvider>
      <GameProvider>{children}</GameProvider>
    </PopupProvider>
  );
}
