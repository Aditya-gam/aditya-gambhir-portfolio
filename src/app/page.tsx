// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

import ProjectCarousel from '@/components/ProjectCarousel';
import LinkedInCard from '@/components/LinkedInCard';
import { getFeaturedProjects } from '@/data/projects';

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
            style={{
              width: 'auto',
              height: 'auto',
            }}
          />
        </div>
        <h1 id="hero-heading" className="text-3xl font-bold mt-4">
          Hello, I&apos;m Aditya
        </h1>
        <p className="hero-content text-hero">
          Software engineer with a passion for building scalable web
          applications and data-driven solutions.
        </p>

        {/* LinkedIn Card - Beautiful custom card without profile photo */}
        <LinkedInCard
          name="Aditya Gambhir"
          headline="MS Computational Data Science | Full-Stack Developer & AI Enthusiast | Expertise in Machine Learning, Computer Vision, and Real-Time Sensor Fusion | Building Scalable, Data-Driven Solutions"
          company="Tech Mahindra"
          university="University of California, Riverside"
          profileUrl="https://www.linkedin.com/in/aditya-gambhir"
        />
      </section>

      {/* Highlights Section */}
      <section className="content-section" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="sr-only-heading">
          Professional Highlights
        </h2>
        <div className="grid-highlights">
          <div className="card-highlight">
            <h3 className="heading-card">2+ Years Experience</h3>
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
        <h2 id="projects-heading" className="heading-section text-center mb-8">
          Featured Projects
        </h2>
        <ProjectCarousel
          projects={featuredProjects}
          autoPlay={true}
          autoPlayInterval={6000}
        />
      </section>

      {/* Call-to-Action Section */}
      <section className="content-section-lg" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only-heading">
          View My Work
        </h2>
        <div className="cta-section">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200"
            aria-label="Learn more about me"
          >
            About Me
          </Link>
        </div>
      </section>
    </main>
  );
}
