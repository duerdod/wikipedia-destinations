import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Smooth-scroll to the element matching the URL hash when it changes. */
export function useAnchorScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);
}
