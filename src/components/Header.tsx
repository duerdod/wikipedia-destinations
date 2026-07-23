import { useLocation } from 'react-router-dom';
import { usePopup } from '../context/PopupContext';
import Stats from './Stats';

export default function Header() {
  const { showPopup } = usePopup();
  const { pathname } = useLocation();

  return (
    <header>
      <Stats />
      {pathname.startsWith('/wiki') && (
        <div className="text-center">
          <button
            className="mb-4 cursor-pointer text-[2rem]"
            onClick={() => showPopup('settings')}
            aria-label="settings"
          >
            ⚙️
          </button>
        </div>
      )}
    </header>
  );
}
