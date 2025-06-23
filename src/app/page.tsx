// app/page.tsx
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  // Title will be combined with layout template: "Home | Aditya Gambhir"
  title: 'Home',
  description:
    'Software engineer with a passion for building scalable web applications and data-driven solutions. 5+ years experience in MERN stack and Data Science.',
  keywords: [
    'Aditya Gambhir',
    'Software Engineer',
    'MERN Stack',
    'Data Science',
    'Portfolio',
    'Full Stack Developer',
    'Machine Learning',
  ],
  authors: [{ name: 'Aditya Gambhir' }],
  openGraph: {
    title: 'Aditya Gambhir | Software Engineer & Data Scientist',
    description:
      'Software engineer with a passion for building scalable web applications and data-driven solutions. 5+ years experience in MERN stack and Data Science.',
    url: 'https://aditya-gambhir-portfolio.vercel.app/',
    siteName: 'Aditya Gambhir Portfolio',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir - Software Engineer & Data Scientist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Gambhir | Software Engineer & Data Scientist',
    description:
      'Software engineer with expertise in MERN stack and Data Science.',
    images: ['/og-default.png'],
  },
};

export default function HomePage() {
  return (
    <main className="page-layout">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-image">
          <Image
            src="/headshot1.webp"
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
        <p className="hero-content text-hero">
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
      <section className="content-section" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="sr-only-heading">
          Professional Highlights
        </h2>
        <div className="grid-highlights">
          <div className="card-highlight">
            <h3 className="heading-card">5+ Years Experience</h3>
            <p className="description-card">Professional Development</p>
          </div>
          <div className="card-highlight">
            <h3 className="heading-card">10+ Projects</h3>
            <p className="description-card">Successfully Delivered</p>
          </div>
          <div className="card-highlight">
            <h3 className="heading-card">MERN & DS</h3>
            <p className="description-card">Technology Expertise</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section
        className="content-section-lg"
        aria-labelledby="projects-heading"
      >
        <h2 id="projects-heading" className="heading-section">
          Featured Projects
        </h2>
        <ul className="grid-projects">
          <li>
            <ProjectCard
              title="Project Alpha"
              description="A full-stack web app for managing tasks."
              bullets={['React', 'Node.js', 'MongoDB']}
              imageSrc="/projects/project1.svg"
              imageAlt="Project Alpha task management interface"
              priority={true}
            />
          </li>
          <li>
            <ProjectCard
              title="Project Beta"
              description="A machine learning pipeline for data analysis."
              bullets={['Python', 'Pandas', 'TensorFlow']}
              imageSrc="/projects/project2.svg"
              imageAlt="Project Beta data analysis dashboard"
              priority={true}
            />
          </li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="content-section-lg" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only-heading">
          Get in Touch
        </h2>
        <div className="cta-section">
          <Link
            href="/resume"
            className="btn-primary"
            aria-label="View my resume"
          >
            View Resume
          </Link>
          <Link
            href="/contact"
            className="btn-secondary"
            aria-label="Contact me"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
