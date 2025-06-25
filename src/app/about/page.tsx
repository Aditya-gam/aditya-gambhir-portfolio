'use client';

import { useContext } from 'react';
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
import { ContactModalContext } from '@/app/ContactModalContext';

export default function AboutPage() {
  const { openContactModal } = useContext(ContactModalContext);

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
        onContactClick={openContactModal}
      />

      <StatsRibbon stats={aboutData.stats} />

      <ProfessionalSummary
        description={aboutData.professionalSummary.description}
      />

      <DualExpertise dualExpertise={aboutData.dualExpertise} />

      <SkillsMatrix skillsMatrix={aboutData.skillsMatrix} />

      <ExperienceTimeline experience={aboutData.experience} />

      <Education education={aboutData.education} />

      <Certifications certifications={aboutData.certifications} />

      <Publications publications={aboutData.publications} />

      <CommunityLeadership community={aboutData.community} />

      <PersonalTouch personalTouch={aboutData.personalTouch} />

      <AboutCTA onContactClick={openContactModal} />
    </main>
  );
}
