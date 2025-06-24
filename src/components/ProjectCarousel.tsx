'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '@/types';

interface ProjectCarouselProps {
  projects: ProjectData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ProjectCarousel({
  projects,
  autoPlay = true,
  autoPlayInterval = 5000,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay);

  if (projects.length === 0) return null;

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex justify-center px-4 py-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1], // Custom easing for smooth animation
            }}
          >
            <div className="w-full max-w-md mx-auto">
              <ProjectCard project={projects[currentIndex]} priority={true} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {projects.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-primary shadow-md'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Project Counter */}
      <div className="text-center mt-4">
        {/* <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {projects.length}
        </span> */}
      </div>
    </div>
  );
}
