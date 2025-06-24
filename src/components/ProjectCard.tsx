import Image from 'next/image';
import Link from 'next/link';
import { ProjectData } from '@/types';
import { ExternalLink, GithubIcon } from 'lucide-react';

interface ProjectCardProps {
  readonly project: ProjectData;
  readonly priority?: boolean;
}

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  const {
    title,
    description,
    bullets,
    imageSrc,
    imageAlt,
    githubUrl,
    liveUrl,
    technologies,
  } = project;

  return (
    <div className="card-project">
      {imageSrc && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={imageAlt ?? `${title} project screenshot`}
            width={600}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <h3 className="heading-card flex-1">{title}</h3>
        <div className="flex gap-2 ml-2">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label={`View ${title} source code on GitHub`}
            >
              {GithubIcon ? (
                <GithubIcon className="w-4 h-4" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <p className="text-muted-foreground mb-3">{description}</p>

      <ul className="tech-list mb-4">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 6 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{technologies.length - 6} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
