import { useEffect, useState, useCallback } from 'react';

interface UseSectionHighlightOptions {
  threshold?: number;
  rootMargin?: string;
  sectionIds: readonly string[];
}

export function useSectionHighlight({
  threshold = 0.6,
  rootMargin = '-20% 0px -20% 0px',
  sectionIds,
}: UseSectionHighlightOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin, sectionIds]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate header height
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
