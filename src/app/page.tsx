// app/page.tsx
'use client';

import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { useContext } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/data/projects';
import { ContactModalContext } from '@/app/ContactModalContext';

function ContactButton() {
  const { openContactModal } = useContext(ContactModalContext);

  return (
    <button
      onClick={openContactModal}
      className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200"
      aria-label="Open contact form"
    >
      Contact Me
    </button>
  );
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

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
          {featuredProjects.map((project) => (
            <li key={project.title}>
              <ProjectCard
                title={project.title}
                description={project.description}
                bullets={project.bullets}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                priority={project.priority}
              />
            </li>
          ))}
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
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200"
            aria-label="View my resume"
          >
            View Resume
          </Link>
          <ContactButton />
        </div>
      </section>
    </main>
  );
}
