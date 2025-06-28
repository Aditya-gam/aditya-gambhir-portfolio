import { useEffect, useState, useCallback } from 'react';

interface UseSectionHighlightOptions {
  threshold?: number;
  rootMargin?: string;
  sectionIds: readonly string[];
}

export function useSectionHighlight({
  threshold = 0.3,
  rootMargin = '-10% 0px -10% 0px',
  sectionIds,
}: UseSectionHighlightOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const isAtTop = window.scrollY < 100;

      if (isAtTop && sectionIds.includes('hero')) {
        setActiveSection('hero');
        return;
      }

      let mostVisibleSection = '';
      let maxVisibility = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibilityRatio = entry.intersectionRatio;
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = entry.target.id;
          }
        }
      });

      if (mostVisibleSection) {
        setActiveSection(mostVisibleSection);
      }
    },
    [sectionIds],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin,
    });

    const handleScroll = () => {
      const isAtTop = window.scrollY < 100;
      if (isAtTop && sectionIds.includes('hero')) {
        setActiveSection('hero');
      }
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (window.scrollY < 100 && sectionIds.includes('hero')) {
      setActiveSection('hero');
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleIntersection, threshold, rootMargin, sectionIds]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return {
    activeSection,
    scrollToSection,
  };
}
