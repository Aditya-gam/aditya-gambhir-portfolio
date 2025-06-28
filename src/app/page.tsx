// app/page.tsx
'use client';

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
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, ExternalLink } from 'lucide-react';
import { getFeaturedSocialProfiles, getLeetCodeProfile } from '@/data/socials';
import SocialProfiles from '@/components/SocialProfiles';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const socialProfiles = getFeaturedSocialProfiles();
  const leetcodeProfile = getLeetCodeProfile();

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
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </div>

            {/* Social Profiles - GitHub and LinkedIn only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Find me on</h3>
              <SocialProfiles profiles={socialProfiles} title="" />
            </div>

            {/* LeetCode link outside main social section */}
            {leetcodeProfile && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Coding Practice</h3>
                <Link
                  href={leetcodeProfile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`View ${leetcodeProfile.name}'s LeetCode profile`}
                >
                  <div className="flex-shrink-0">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect width="24" height="24" rx="4" fill="#FFA116" />
                      <path
                        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.858 2.133 8.062-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-2.365-1.914-5.26-1.611-7.13.091L4.568 9.322a5.612 5.612 0 0 0-1.315 2.942 5.6 5.6 0 0 0-.121 1.57c.097 3.4 2.715 6.299 5.972 6.299 1.6 0 3.167-.755 4.125-2.11l3.627-4.014c.669-.74.558-1.868-.247-2.457-.805-.588-1.92-.439-2.589.301l-3.627 4.014a2.025 2.025 0 0 1-1.33.717c-1.4-.074-2.356-1.555-2.356-2.942a2.544 2.544 0 0 1 .619-1.703L9.13 8.114l3.854-4.126a1.374 1.374 0 0 0-.961-.438z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      LeetCode Profile
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {leetcodeProfile.stats?.[0]?.value} problems solved
                    </div>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 text-muted-foreground ml-auto"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Right column - Contact form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
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
