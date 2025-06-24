'use client';

import {
  AboutHero,
  StatsRibbon,
  ProfessionalSummary,
  DualExpertise,
  SkillsMatrix,
  ExperienceTimeline,
  Education,
  Certifications,
  Publications,
  CommunityLeadership,
  PersonalTouch,
  AboutCTA,
} from '@/components/about';
import { aboutData } from '@/data/about';

export default function AboutPage() {
  return (
    <main className="page-layout">
      {/* Breadcrumb */}
      <nav
        className="text-sm text-muted-foreground mb-8"
        aria-label="Breadcrumb"
      >
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">About Me</span>
      </nav>

      {/* All sections using modular components */}
      <AboutHero
        name={aboutData.hero.name}
        title={aboutData.hero.title}
        description={aboutData.hero.description}
        image={aboutData.hero.image}
        resumes={aboutData.hero.resumes}
      />

      <StatsRibbon stats={aboutData.stats} />

      <ProfessionalSummary
        description={aboutData.professionalSummary.description}
        quote={aboutData.professionalSummary.quote}
      />

      <DualExpertise dualExpertise={aboutData.dualExpertise} />

      <SkillsMatrix skillsMatrix={aboutData.skillsMatrix} />

      <ExperienceTimeline experience={aboutData.experience} />

      <Education education={aboutData.education} />

      <Certifications certifications={aboutData.certifications} />

      <Publications publications={aboutData.publications} />

      <CommunityLeadership community={aboutData.community} />

      <PersonalTouch personalTouch={aboutData.personalTouch} />

      <AboutCTA resumes={aboutData.hero.resumes} />
    </main>
  );
}
