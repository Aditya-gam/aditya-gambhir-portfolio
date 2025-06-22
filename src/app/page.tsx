// app/page.tsx
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  title: 'Aditya Gambhir - Software Engineer Portfolio',
  description:
    'Software engineer with a passion for building scalable web applications and data-driven solutions. 5+ years experience in MERN stack and Data Science.',
  keywords: [
    'Aditya Gambhir',
    'Software Engineer',
    'MERN Stack',
    'Data Science',
    'Portfolio',
  ],
  authors: [{ name: 'Aditya Gambhir' }],
  openGraph: {
    title: 'Aditya Gambhir - Software Engineer Portfolio',
    description:
      'Software engineer with a passion for building scalable web applications and data-driven solutions.',
    type: 'website',
    images: [
      {
        url: '/headshot.webp',
        width: 150,
        height: 150,
        alt: 'Aditya Gambhir headshot',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center text-center"
        aria-labelledby="hero-heading"
      >
        <div className="relative">
          <Image
            src="/headshot.webp"
            alt="Aditya Gambhir - Software Engineer"
            width={150}
            height={150}
            className="rounded-full object-cover"
            priority
            sizes="150px"
          />
        </div>
        <h1 id="hero-heading" className="text-3xl font-bold mt-4">
          Hello, I&apos;m Aditya
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-md text-lg">
          Software engineer with a passion for building scalable web
          applications and data-driven solutions.
        </p>

        {/* LinkedIn Badge Script */}
        <Script
          src="https://platform.linkedin.com/badges/js/profile.js"
          strategy="afterInteractive"
        />
        <div
          className="badge-base LI-profile-badge mt-4"
          data-locale="en_US"
          data-size="medium"
          data-theme="light"
          data-type="horizontal"
          data-vanity="aditya-gambhir"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/aditya-gambhir?trk=profile-badge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Aditya Gambhir's LinkedIn profile"
          >
            Aditya Gambhir
          </a>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mt-12" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="sr-only">
          Professional Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              5+ Years Experience
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Professional Development
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              10+ Projects
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Successfully Delivered
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              MERN & DS
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Technology Expertise
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="mt-16" aria-labelledby="projects-heading">
        <h2
          id="projects-heading"
          className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100"
        >
          Featured Projects
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 list-none">
          <li>
            <ProjectCard
              title="Project Alpha"
              description="A full-stack web app for managing tasks."
              bullets={['React', 'Node.js', 'MongoDB']}
            />
          </li>
          <li>
            <ProjectCard
              title="Project Beta"
              description="A machine learning pipeline for data analysis."
              bullets={['Python', 'Pandas', 'TensorFlow']}
            />
          </li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-16" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">
          Get in Touch
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/resume"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="View my resume"
          >
            View Resume
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Contact me"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
