import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePopup } from '../context/PopupContext';

interface PopupProps {
  id: string;
  children: ReactNode;
  preventBodyScroll?: boolean;
  closeOnBackdropClick?: boolean;
}

/**
 * A modal rendered into #modalRoot. Enters with a small scale/fade (plain CSS
 * transition — the old react-spring dependency is gone). Closes on Escape or,
 * optionally, a backdrop click.
 */
export default function Popup({
  id,
  children,
  preventBodyScroll = true,
  closeOnBackdropClick = true,
}: PopupProps) {
  const { popupId, hidePopup } = usePopup();
  const open = popupId === id;
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(raf);
      setEntered(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hidePopup();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, hidePopup]);

  useEffect(() => {
    if (!open || !preventBodyScroll) return;
    document.body.classList.add('popup-open');
    return () => document.body.classList.remove('popup-open');
  }, [open, preventBodyScroll]);

  const modalRoot = document.getElementById('modalRoot');
  if (!open || !modalRoot) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/20"
        onClick={closeOnBackdropClick ? hidePopup : undefined}
      />
      <div
        className={
          'fixed left-1/2 top-1/2 z-[200] max-h-full w-[450px] max-w-full -translate-x-1/2' +
          ' -translate-y-1/2 overflow-y-auto p-4 transition-all duration-150 ' +
          (entered ? 'scale-100 opacity-100' : 'scale-0 opacity-0')
        }
      >
        {children}
      </div>
    </>,
    modalRoot,
  );
}
