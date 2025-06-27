// app/page.tsx
'use client';

import { HeroSection, StatsMarquee } from '@/components/hero';
import ProjectCarousel from '@/components/ProjectCarousel';
import { Publications } from '@/components/about';
import { getFeaturedProjects } from '@/data/projects';
import { aboutData } from '@/data/about';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  // Merge stats from both Home and About pages
  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: 'MERN & DS', label: 'Technology Expertise' },
    { value: '3.67', label: 'M.S. GPA' },
    { value: '1', label: 'Peer-reviewed Publications' },
    { value: '450+', label: 'LeetCode Problems' },
  ];

  return (
    <main className="page-layout">
      {/* New Hero Section */}
      <HeroSection />

      {/* Stats Marquee */}
      <StatsMarquee stats={stats} className="mb-16" />

      {/* Featured Projects Section */}
      <section
        id="projects"
        className="content-section-lg"
        aria-labelledby="projects-heading"
      >
        <h2 id="projects-heading" className="heading-section text-center mb-8">
          Featured Projects
        </h2>
        <ProjectCarousel projects={featuredProjects} />
      </section>

      {/* Publications Section */}
      <section
        id="publications"
        className="content-section-lg"
        aria-labelledby="publications-heading"
      >
        <Publications publications={aboutData.publications} />
      </section>
    </main>
  );
}
