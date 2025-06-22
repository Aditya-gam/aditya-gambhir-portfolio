interface ProjectCardProps {
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
}

export default function ProjectCard({
  title,
  description,
  bullets,
}: ProjectCardProps) {
  return (
    <div className="card-project">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted mb-3">{description}</p>
      <ul className="tech-list text-muted">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="icon-list">
        {/* Placeholder tech icons */}
        <span
          className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"
          aria-hidden="true"
        ></span>
        <span
          className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"
          aria-hidden="true"
        ></span>
      </div>
    </div>
  );
}
