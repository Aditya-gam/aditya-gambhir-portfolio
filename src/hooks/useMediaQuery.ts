import { useEffect, useState } from 'react';

/**
 * Custom hook to detect media query matches
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Define the listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * Hook to detect if screen is below lg breakpoint (< 1024px)
 * This matches the breakpoint where MobileNav is active
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}

/**
 * Hook to detect if screen is below md breakpoint (< 768px)
 */
export function useIsSmallMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}
