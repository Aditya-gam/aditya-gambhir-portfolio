import { useEffect, useState } from 'react';

interface UseScrollPositionOptions {
  threshold?: number;
}

export function useScrollPosition({
  threshold = 50,
}: UseScrollPositionOptions = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    // Set initial scroll position
    updateScrollPosition();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { scrollY, isScrolled };
}
