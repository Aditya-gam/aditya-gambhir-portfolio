import type { Metadata } from 'next';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Software, generative-AI and data-science projects by Aditya Gambhir — multi-agent LLM systems, geospatial big-data, privacy tooling, and transformer research.',
  keywords: [
    'projects',
    'portfolio',
    'software engineering',
    'generative AI',
    'LLM',
    'machine learning',
    'FastAPI',
    'Next.js',
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Aditya Gambhir',
    description:
      'Software, generative-AI and data-science projects — multi-agent LLM systems, geospatial big-data, privacy tooling, and transformer research.',
    url: 'https://aditya-gambhir-portfolio.vercel.app/projects',
    siteName: 'Aditya Gambhir Portfolio',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Aditya Gambhir',
    description:
      'Software, generative-AI and data-science projects by Aditya Gambhir.',
    images: ['/og-default.png'],
  },
};

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
