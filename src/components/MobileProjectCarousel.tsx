/**
 * MobileProjectCarousel Component
 *
 * Mobile-optimized carousel for project cards that shows one card
 * prominently with horizontal scrolling for additional cards.
 * Active when screen width is below lg breakpoint (< 1024px).
 */

'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '@/types';
import { Button } from '@/components/ui/button';

interface MobileProjectCarouselProps {
  readonly projects: ProjectData[];
  readonly className?: string;
}

export default function MobileProjectCarousel({
  projects,
  className = '',
}: MobileProjectCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update scroll indicators
  const updateScrollIndicators = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Calculate current visible card index
  const updateCurrentIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(newIndex, projects.length - 1));
  }, [projects.length]);

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateScrollIndicators();
      updateCurrentIndex();
    };

    container.addEventListener('scroll', handleScroll);

    // Initial setup
    updateScrollIndicators();
    updateCurrentIndex();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [projects.length, updateScrollIndicators, updateCurrentIndex]);

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  // Navigate functions
  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToCard(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(projects.length - 1, currentIndex + 1);
    scrollToCard(newIndex);
  };

  if (projects.length === 0) return null;

  return (
    <div className={`mobile-project-carousel w-full ${className}`}>
      <div className="relative w-full max-w-sm mx-auto">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="mobile-project-scroll flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title || index}
              className="flex-shrink-0 w-full snap-center px-2"
            >
              <ProjectCard
                project={project}
                priority={index < 3} // Prioritize first 3 images for loading
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Only show if more than 1 card */}
        {projects.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background/90 ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background/90 ${
                !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Dot Indicators */}
        {projects.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Card Counter */}
        {projects.length > 1 && (
          <div className="text-center mt-2">
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} of {projects.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
