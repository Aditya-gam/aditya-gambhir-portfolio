/**
 * MobileSocialCarousel Component
 *
 * Mobile-optimized carousel for social profiles that shows one card
 * prominently with horizontal scrolling for additional cards.
 * Active when screen width is below lg breakpoint (< 1024px).
 */

'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SocialCard from './SocialCard';
import { SocialProfile } from '@/types';
import { Button } from '@/components/ui/button';

interface MobileSocialCarouselProps {
  readonly profiles: SocialProfile[];
  readonly title?: string;
  readonly className?: string;
}

export default function MobileSocialCarousel({
  profiles,
  title = 'Connect With Me',
  className = '',
}: MobileSocialCarouselProps) {
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
    setCurrentIndex(Math.min(newIndex, profiles.length - 1));
  }, [profiles.length]);

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
  }, [profiles.length, updateScrollIndicators, updateCurrentIndex]);

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
    const newIndex = Math.min(profiles.length - 1, currentIndex + 1);
    scrollToCard(newIndex);
  };

  if (profiles.length === 0) return null;

  return (
    <div className={`mobile-social-carousel ${className}`}>
      {title && <h2 className="heading-section text-center mb-6">{title}</h2>}

      <div className="relative w-full max-w-md mx-auto">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="mobile-social-scroll flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {profiles.map((profile) => (
            <div
              key={`${profile.platform}-${profile.username}`}
              className="flex-shrink-0 w-full snap-center px-2"
            >
              <SocialCard profile={profile} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Only show if more than 1 card */}
        {profiles.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background/90 ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Previous social profile"
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
              aria-label="Next social profile"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Dot Indicators */}
        {profiles.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {profiles.map((profile, index) => (
              <button
                key={`${profile.platform}-${profile.username}-dot`}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to social profile ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Card Counter */}
        {profiles.length > 1 && (
          <div className="text-center mt-2">
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} of {profiles.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
