/**
 * Generic Mobile Carousel Component
 *
 * A reusable mobile-optimized carousel that shows one item prominently
 * with horizontal scrolling. Supports any type of content through render props.
 */

'use client';

import { useRef, useEffect, useState, useCallback, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselProps<T> {
  readonly items: T[];
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly getItemKey: (item: T, index: number) => string;
  readonly title?: string;
  readonly className?: string;
  readonly showIndicators?: boolean;
  readonly showCounter?: boolean;
  readonly showNavigation?: boolean;
}

export function Carousel<T>({
  items,
  renderItem,
  getItemKey,
  title,
  className = '',
  showIndicators = true,
  showCounter = true,
  showNavigation = true,
}: CarouselProps<T>) {
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

  // Calculate current visible item index
  const updateCurrentIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(newIndex, items.length - 1));
  }, [items.length]);

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
  }, [items.length, updateScrollIndicators, updateCurrentIndex]);

  // Scroll to specific item
  const scrollToItem = (index: number) => {
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
    scrollToItem(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(items.length - 1, currentIndex + 1);
    scrollToItem(newIndex);
  };

  if (items.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      {title && <h2 className="heading-section text-center mb-6">{title}</h2>}

      <div className="relative w-full max-w-md mx-auto">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div
              key={getItemKey(item, index)}
              className="flex-shrink-0 w-full snap-center px-2"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Only show if more than 1 item */}
        {showNavigation && items.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background/90 ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Previous item"
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
              aria-label="Next item"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Dot Indicators */}
        {showIndicators && items.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {items.map((item, index) => (
              <button
                key={getItemKey(item, index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                onClick={() => scrollToItem(index)}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {showCounter && items.length > 1 && (
          <div className="text-center mt-2">
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
