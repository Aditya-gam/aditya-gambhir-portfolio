/**
 * MobileProjectCarousel Component
 *
 * Mobile-optimized carousel for project cards using the generic Carousel component.
 * Active when screen width is below lg breakpoint (< 1024px).
 */

'use client';

import { ProjectData } from '@/types';
import { Carousel } from '@/components/ui/carousel';
import ProjectCard from './ProjectCard';

interface MobileProjectCarouselProps {
  readonly projects: ProjectData[];
  readonly className?: string;
}

export default function MobileProjectCarousel({
  projects,
  className = '',
}: MobileProjectCarouselProps) {
  return (
    <Carousel
      items={projects}
      renderItem={(project, index) => (
        <ProjectCard
          project={project}
          priority={index < 3} // Prioritize first 3 images for loading
        />
      )}
      getItemKey={(project) => project.title}
      className={`mobile-project-carousel ${className}`}
      showIndicators={true}
      showCounter={true}
      showNavigation={true}
    />
  );
}
