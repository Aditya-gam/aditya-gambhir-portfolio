// app/projects/page.tsx
import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { getAllProjects } from '@/data/projects';

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

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <main className="page-layout">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="heading-page">My Projects</h1>
        <p className="text-hero max-w-2xl mx-auto">
          A collection of my software engineering and data science projects
          showcasing different technologies and problem-solving approaches.
        </p>
      </header>

      {/* Projects Grid */}
      <section
        aria-labelledby="projects-list-heading"
        className="content-section"
      >
        <h2 id="projects-list-heading" className="sr-only">
          Projects List
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none">
          {allProjects.map((project, index) => (
            <li key={project.title}>
              <ProjectCard project={project} priority={index < 2} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
