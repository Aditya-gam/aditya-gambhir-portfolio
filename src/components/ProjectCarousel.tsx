'use client';

import ProjectCard from './ProjectCard';
import MobileProjectCarousel from './MobileProjectCarousel';
import { ProjectData } from '@/types';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface ProjectCarouselProps {
  projects: ProjectData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const isMobile = useIsMobile();

  if (projects.length === 0) return null;

  // Use mobile carousel for screens below lg breakpoint
  if (isMobile) {
    return <MobileProjectCarousel projects={projects} />;
  }

  // Desktop layout - determine layout based on number of projects
  const getLayoutClasses = () => {
    switch (projects.length) {
      case 1:
        return {
          container: 'flex justify-center',
          item: 'w-full max-w-md',
        };
      case 2:
        return {
          container: 'flex justify-center gap-6',
          item: 'w-full max-w-sm',
        };
      case 3:
        return {
          container: 'flex justify-center gap-4',
          item: 'w-full max-w-xs',
        };
      default:
        return {
          container: 'flex gap-4 overflow-x-auto projects-scroll pb-4',
          item: 'flex-shrink-0 w-80',
        };
    }
  };

  const { container, item } = getLayoutClasses();

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div
        className={container}
        style={{
          minWidth: projects.length > 3 ? 'max-content' : 'auto',
        }}
      >
        {projects.map((project, index) => (
          <div key={project.title || index} className={item}>
            <ProjectCard
              project={project}
              priority={index < 3} // Prioritize first 3 images for loading
            />
          </div>
        ))}
      </div>

      {/* Show scroll hint for 4+ projects */}
      {projects.length > 3 && (
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">
            Scroll horizontally to view all {projects.length} projects
          </span>
        </div>
      )}
    </div>
  );
}
