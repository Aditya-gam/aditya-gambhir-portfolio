// app/page.tsx
'use client';

import { useContext } from 'react';
import { HeroSection, StatsMarquee } from '@/components/hero';
import ProjectCarousel from '@/components/ProjectCarousel';
import { ContactForm } from '@/components/ContactForm';
import {
  AboutGrid,
  DualExpertise,
  SkillsMatrix,
  ExperienceTimeline,
  Publications,
} from '@/components/about';
import { getFeaturedProjects } from '@/data/projects';
import { aboutData } from '@/data/about';
import { ContactModalContext } from '@/app/ContactModalContext';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { getFeaturedSocialProfiles } from '@/data/socials';
import SocialProfiles from '@/components/SocialProfiles';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const { openContactModal } = useContext(ContactModalContext);
  const socialProfiles = getFeaturedSocialProfiles();

  // Merge stats from both Home and About pages
  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: 'MERN & DS', label: 'Technology Expertise' },
    { value: '3.67', label: 'M.S. GPA' },
    { value: '1', label: 'Peer-reviewed Publications' },
    { value: '450+', label: 'LeetCode Problems' },
  ];

  // Macro-skills data according to plan
  const macroSkills = [
    { icon: '💻', label: 'Full-Stack Dev' },
    { icon: '🤖', label: 'ML & GenAI' },
    { icon: '⚡', label: 'Perf & Docs' },
    { icon: '🧩', label: 'Problem-Solving' },
    { icon: '🤝', label: 'Collaboration' },
    { icon: '☁️', label: 'Cloud Architecture' },
  ];

  return (
    <main className="page-layout">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Ribbon - merged numeric ribbons */}
      <StatsMarquee stats={stats} className="mb-16" />

      {/* About Section - Profile split with macro-skills */}
      <section
        id="about"
        className="content-section-lg"
        aria-labelledby="about-heading"
      >
        <div className="text-center mb-12">
          <h2 id="about-heading" className="heading-section mb-4">
            About Me
          </h2>
        </div>

        {/* Profile Split - 2-column layout */}
        <AboutGrid
          name={aboutData.hero.name}
          title="AI/ML Engineer"
          description={aboutData.hero.description}
          image={aboutData.hero.image}
          imageVariant="rounded" // Default circular crop as specified
          className="mb-12"
        />

        {/* Macro-skills chips - row of icon-label chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {macroSkills.map((skill) => (
            <div
              key={skill.label}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span className="text-lg">{skill.icon}</span>
              <span className="text-sm font-medium">{skill.label}</span>
            </div>
          ))}
        </div>

        {/* Dual Expertise */}
        <DualExpertise dualExpertise={aboutData.dualExpertise} />
      </section>

      {/* Skills Matrix */}
      <section
        id="skills"
        className="content-section-lg"
        aria-labelledby="skills-heading"
      >
        <SkillsMatrix skillsMatrix={aboutData.skillsMatrix} />
      </section>

      {/* Featured Projects Section */}
      <section
        id="projects"
        className="content-section-lg"
        aria-labelledby="projects-heading"
      >
        <div className="text-center mb-8">
          <h2 id="projects-heading" className="heading-section mb-4">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            aria-label="View all projects"
          >
            Explore all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProjectCarousel projects={featuredProjects} />
      </section>

      {/* Experience Timeline */}
      <section
        id="experience"
        className="content-section-lg"
        aria-labelledby="experience-heading"
      >
        <ExperienceTimeline experience={aboutData.experience} />
      </section>

      {/* Contact Section - two-column layout as specified */}
      <section
        id="contact"
        className="content-section-lg"
        aria-labelledby="contact-heading"
      >
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="heading-section mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let&apos;s discuss how I
            can help bring your ideas to life.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column - Contact info + social */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Let&apos;s Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>aditya.gambhir@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Find me on</h3>
              <SocialProfiles profiles={socialProfiles} title="" />
            </div>
          </div>

          {/* Right column - Contact form */}
          <div>
            <ContactForm />
          </div>
        </div>
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
