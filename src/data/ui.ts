// Import content from centralized content files
import {
  HERO_CONTENT,
  ABOUT_CONTENT,
  SKILLS_CONTENT,
  EXPERIENCE_CONTENT,
  PROJECTS_CONTENT,
  CONTACT_CONTENT,
  SOCIAL_CONTENT,
  HEADER_FOOTER_CONTENT,
  MODAL_CONTENT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from './content';

// Re-export content from centralized content files for backward compatibility
export {
  HERO_CONTENT,
  ABOUT_CONTENT,
  SKILLS_CONTENT,
  EXPERIENCE_CONTENT,
  PROJECTS_CONTENT,
  CONTACT_CONTENT,
  SOCIAL_CONTENT,
  HEADER_FOOTER_CONTENT,
  MODAL_CONTENT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from './content';

// Legacy exports - maintain backward compatibility
export const EXPERIENCE_PAGE_COPY = {
  timelineNavigationInstruction:
    EXPERIENCE_CONTENT.timeline.navigationInstruction,
} as const;

export const HOMEPAGE_COPY = {
  aboutSectionTitle: ABOUT_CONTENT.sectionTitle,
  macroSkills: [
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
  ],
  stats: [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: 'MERN & DS', label: 'Technology Expertise' },
    { value: '3.67', label: 'M.S. GPA' },
    { value: '1', label: 'Peer-reviewed Publications' },
  ],
  skillsSectionTitle: SKILLS_CONTENT.sectionTitle,
  projectsSection: {
    title: PROJECTS_CONTENT.sectionTitle,
    cta: PROJECTS_CONTENT.cta,
    allProjectsLabel: PROJECTS_CONTENT.allProjectsLabel,
  },
  contactSection: {
    title: CONTACT_CONTENT.sectionTitle,
    description: CONTACT_CONTENT.description,
    connectHeading: CONTACT_CONTENT.connectHeading,
    socialHeading: CONTACT_CONTENT.socialHeading,
    emailAriaLabel: CONTACT_CONTENT.emailAriaLabel,
  },
} as const;

export const UI_COPY = {
  opportunityBadge: HERO_CONTENT.opportunityBadge,
  aboutCTA: ABOUT_CONTENT.cta,
  heroCTA: HERO_CONTENT.cta,
  personalTouch: ABOUT_CONTENT.personalTouch,
  dualExpertise: ABOUT_CONTENT.dualExpertise,
  experienceTimeline: EXPERIENCE_CONTENT.timeline,
  education: EXPERIENCE_CONTENT.education,
  publications: EXPERIENCE_CONTENT.publications,
  certifications: EXPERIENCE_CONTENT.certifications,
  communityLeadership: EXPERIENCE_CONTENT.communityLeadership,
  contactModal: CONTACT_CONTENT.modal,
  footer: {
    rights: 'All rights reserved.',
  },
} as const;
