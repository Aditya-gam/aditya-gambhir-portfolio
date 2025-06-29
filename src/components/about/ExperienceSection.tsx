'use client';

import ExperienceTimeline from './ExperienceTimeline';
import Education from './Education';
import Publications from './Publications';
import Certifications from './Certifications';
import { aboutData } from '@/data/about';
import React from 'react';

interface ExperienceSectionProps {
  readonly experience?: typeof aboutData.experience;
  readonly education?: typeof aboutData.education;
  readonly publications?: typeof aboutData.publications;
  readonly certifications?: typeof aboutData.certifications;
  readonly className?: string;
}

/**
 * High-level wrapper that groups all professional credentials:
 *  – Experience timeline
 *  – Education records
 *  – Publications list
 *  – Certifications carousel
 *
 * Each child component is already accessibility-compliant; this wrapper merely
 * adds shared heading & spacing while preserving the existing `#experience`
 * anchor used by in-page navigation.
 */
export default function ExperienceSection({
  experience = aboutData.experience,
  education = aboutData.education,
  publications = aboutData.publications,
  certifications = aboutData.certifications,
  className = '',
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className={`content-section-lg ${className}`.trim()}
      aria-labelledby="experience-heading"
    >
      {/* <h2 id="experience-heading" className="heading-section mb-10 text-center">
        Experience
      </h2> */}

      {/* Professional experience timeline */}
      <ExperienceTimeline experience={experience} />

      {/* Education */}
      <div className="mt-16">
        <Education education={education} />
      </div>

      {/* Publications */}
      <div className="mt-16">
        <Publications publications={publications} />
      </div>

      {/* Certifications carousel */}
      <div className="mt-16">
        <Certifications certifications={certifications} />
      </div>
    </section>
  );
}
