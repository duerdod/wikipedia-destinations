import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useAnchorScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (!element) return;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);
}

export default useAnchorScroll;
