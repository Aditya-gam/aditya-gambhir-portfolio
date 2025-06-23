import Image from 'next/image';

interface ProjectCardProps {
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly imageWidth?: number;
  readonly imageHeight?: number;
  readonly priority?: boolean;
}

export default function ProjectCard({
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
  imageWidth = 600,
  imageHeight = 400,
  priority = false,
}: ProjectCardProps) {
  return (
    <div className="card-project">
      {imageSrc && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={imageAlt ?? `${title} project screenshot`}
            width={imageWidth}
            height={imageHeight}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted mb-3">{description}</p>
      <ul className="tech-list text-muted">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="icon-list">
        {/* Placeholder tech icons - these would be replaced with actual icons when implemented */}
        <span
          className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"
          aria-hidden="true"
          title="Technology placeholder icon"
        ></span>
        <span
          className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"
          aria-hidden="true"
          title="Technology placeholder icon"
        ></span>
        {/* 
          When actual tech icons are added, use this pattern:
          <Image src={techIcon} alt={`${techName} icon`} width={24} height={24} />
        */}
      </div>
    </div>
  );
}
