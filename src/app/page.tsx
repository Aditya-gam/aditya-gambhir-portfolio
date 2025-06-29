// app/page.tsx
'use client';

import { HeroSection } from '@/components/hero';
import ProjectCarousel from '@/components/ProjectCarousel';
import { ContactForm } from '@/components/ContactForm';
import {
  AboutGrid,
  DualExpertise,
  SkillsMatrix,
  StatsCounter,
} from '@/components/about';
import { getFeaturedProjects } from '@/data/projects';
import { aboutData } from '@/data/about';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { getFeaturedSocialProfiles } from '@/data/socials';
import SocialProfiles from '@/components/SocialProfiles';
import ExperienceSection from '@/components/about/ExperienceSection';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const socialProfiles = getFeaturedSocialProfiles();

  // Stats for the counter cards
  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: 'MERN & DS', label: 'Technology Expertise' },
    { value: '3.67', label: 'M.S. GPA' },
    { value: '1', label: 'Peer-reviewed Publications' },
  ];

  // Macro-skills data for card grid
  const macroSkills = [
    {
      icon: '💻',
      title: 'Full Stack Development',
      description:
        'Building scalable applications with modern technologies across the stack.',
    },
    {
      icon: '🤖',
      title: 'AI/ML Engineering',
      description:
        'Developing intelligent systems and fine-tuning large language models.',
    },
    {
      icon: '☁️',
      title: 'Cloud Architecture',
      description:
        'Designing and implementing scalable cloud solutions on AWS.',
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Optimizing systems for high performance and efficiency.',
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description:
        'Thriving in fast-paced environments and cross-functional teams.',
    },
    {
      icon: '🎯',
      title: 'Problem Solving',
      description: 'Bridging real-world problems with cutting-edge technology.',
    },
  ];

  return (
    <main className="page-layout">
      {/* Hero Section */}
      <HeroSection />

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

        {/* Macro-skills cards - grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          {macroSkills.map((skill) => (
            <div
              key={skill.title}
              className="card-base flex flex-col items-start h-full p-6 border-l-4 border-primary/60 bg-card/80 hover:shadow-md hover:border-primary/80 transition-all duration-200"
            >
              <div className="text-3xl mb-3" aria-hidden="true">
                {skill.icon}
              </div>
              <div className="font-semibold text-lg mb-1 text-foreground">
                {skill.title}
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {skill.description}
              </div>
            </div>
          ))}
        </div>

        {/* Dual Expertise */}
        <DualExpertise dualExpertise={aboutData.dualExpertise} />
      </section>

      {/* Stats Counter Cards */}
      <StatsCounter stats={stats} />

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

      {/* Experience & Credentials */}
      <ExperienceSection />

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
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  <a
                    href="mailto:gambhir.aditya19@gmail.com"
                    className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    aria-label="Send email to Aditya Gambhir"
                  >
                    gambhir.aditya19@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(aboutData.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    aria-label={`Open ${aboutData.location} on Google Maps`}
                  >
                    {aboutData.location}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Profiles - GitHub and LinkedIn only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Find me on</h3>
              <SocialProfiles profiles={socialProfiles} title="" iconOnly />
            </div>
          </div>

          {/* Right column - Contact form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
