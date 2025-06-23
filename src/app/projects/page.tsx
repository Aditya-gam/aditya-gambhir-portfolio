// app/projects/page.tsx
import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of software engineering and data science projects including full-stack web applications, machine learning models, and data analysis solutions.',
  keywords: [
    'projects',
    'portfolio',
    'software engineering',
    'web development',
    'data science',
    'machine learning',
    'MERN stack',
    'Python',
  ],
  openGraph: {
    title: 'Projects | Aditya Gambhir',
    description:
      'Explore my portfolio of software engineering and data science projects including full-stack web applications, machine learning models, and data analysis solutions.',
    url: 'https://aditya-gambhir-portfolio.vercel.app/projects',
    siteName: 'Aditya Gambhir Portfolio',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir Projects Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Aditya Gambhir',
    description:
      'Explore my portfolio of software engineering and data science projects.',
    images: ['/og-default.png'],
  },
};

// Define proper TypeScript interface for project data
interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
  readonly imageSrc?: string;
  readonly imageAlt?: string;
}

// Move data to a structured format - could be moved to a separate file later
const projects: readonly Project[] = [
  {
    id: 'project-one',
    title: 'Project One',
    description: 'Description for project one.',
    bullets: ['Feature A', 'Feature B'],
    imageSrc: '/projects/project1.svg',
    imageAlt: 'Project One screenshot showing the main interface',
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description: 'Description for project two.',
    bullets: ['Feature X', 'Feature Y'],
    imageSrc: '/projects/project2.svg',
    imageAlt: 'Project Two screenshot displaying key features',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description: 'Description for project three.',
    bullets: ['Feature M', 'Feature N'],
    imageSrc: '/projects/project3.svg',
    imageAlt: 'Project Three screenshot highlighting functionality',
  },
] as const;

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="heading-page">My Projects</h1>
        <p className="page-description">
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
          {projects.map((project, index) => (
            <li key={project.id}>
              <ProjectCard
                title={project.title}
                description={project.description}
                bullets={project.bullets}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                priority={index < 2}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
