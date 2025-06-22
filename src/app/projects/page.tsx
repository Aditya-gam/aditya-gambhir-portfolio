// app/projects/page.tsx
import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  title: 'Projects - Aditya Gambhir',
  description:
    'Explore my portfolio of software engineering projects including web applications, data science projects, and more.',
  keywords: [
    'projects',
    'portfolio',
    'software engineering',
    'web development',
    'data science',
  ],
};

// Define proper TypeScript interface for project data
interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
}

// Move data to a structured format - could be moved to a separate file later
const projects: readonly Project[] = [
  {
    id: 'project-one',
    title: 'Project One',
    description: 'Description for project one.',
    bullets: ['Feature A', 'Feature B'],
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description: 'Description for project two.',
    bullets: ['Feature X', 'Feature Y'],
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description: 'Description for project three.',
    bullets: ['Feature M', 'Feature N'],
  },
] as const;

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          My Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of my software engineering projects showcasing different
          technologies and problem-solving approaches.
        </p>
      </header>

      {/* Projects Grid */}
      <section aria-labelledby="projects-list-heading">
        <h2 id="projects-list-heading" className="sr-only">
          Projects List
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard
                title={project.title}
                description={project.description}
                bullets={project.bullets}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
