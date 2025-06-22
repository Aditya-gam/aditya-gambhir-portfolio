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
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-3">{description}</p>
      <ul className="list-disc list-inside mb-3 text-gray-600 dark:text-gray-300 space-y-1">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="flex space-x-2">
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
