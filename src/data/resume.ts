import { aboutData } from '@/data/about';
import { Brain, Code } from 'lucide-react';

export interface ResumeData {
  readonly id: string;
  readonly title: string;
  readonly filename: string;
  readonly downloadName: string;
  readonly description: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly targetAudience: string;
  readonly lastUpdated: string;
  readonly fileSize: string;
  readonly type: 'sde' | 'ds';
  /** Short role/specialisation label shown inside the modal */
  readonly roleTitle: string;
  /** Candidate's name – duplicated here so the modal pulls all content from this file only */
  readonly name?: string;
  /** Current location string */
  readonly location?: string;
}

// Single Software-Engineer résumé (dual-résumé UI collapsed per 2026 decision).
export const resumeData: readonly ResumeData[] = [
  {
    id: 'sde',
    title: 'Software Engineer Résumé',
    filename: 'Aditya_Gambhir_SDE.pdf',
    downloadName: 'Aditya_Gambhir_Software_Engineer_Resume.pdf',
    description:
      'Backend-focused CV: Java/Spring Boot and Python/FastAPI microservices, Kafka event streaming, PostgreSQL, Docker and Kubernetes on AWS and Azure, and CI/CD — plus generative-AI work with LangChain, LangGraph, and RAG.',
    summary:
      'Software Engineer with 3+ years building production-grade microservices and event-driven backend systems processing enterprise-scale transaction volumes. Reduced release cycles from weeks to days through disciplined CI/CD, rigorous test-driven engineering, and 85% code coverage standards. Committed to bridging generative AI capabilities with distributed architecture to deliver secure, reliable, and high-performance systems.',
    highlights: [
      'Backend · Java, Spring Boot, FastAPI, microservices',
      'Event streaming · Kafka, 100k+ events/day',
      'Generative AI · LangChain, LangGraph, RAG, Azure OpenAI',
      'Cloud & DevOps · AWS, Azure, Docker, Kubernetes, Terraform',
      'Testing · JUnit, Mockito, ~85% coverage',
    ],
    targetAudience:
      'Backend / Full-Stack / Platform Engineering and Generative-AI roles',
    lastUpdated: 'Oct 2026',
    fileSize: '310 KB',
    type: 'sde',
    roleTitle: 'Software Engineer',
    name: 'Aditya Gambhir',
    location: 'Los Angeles, CA',
  },
] as const;

export const getResumeById = (id: string): ResumeData | undefined =>
  resumeData.find((resume) => resume.id === id);

export const getAllResumes = (): readonly ResumeData[] => resumeData;

export const getPrimaryResume = (): ResumeData => resumeData[0];

// ---------------------------------------------------------------------------
// Helper to construct dynamic content for the <ResumeModal /> component so the
// modal itself contains ZERO hard-coded business content.
// ---------------------------------------------------------------------------
export const getResumeModalContent = (resume: ResumeData) => {
  const isDataScience = resume.type === 'ds';

  const title =
    resume.roleTitle ??
    (isDataScience ? 'Data Scientist' : 'Software Engineer');

  const accentClasses = {
    border: isDataScience ? 'border-l-emerald-500' : 'border-l-primary',
    bg: isDataScience
      ? 'bg-emerald-50 dark:bg-emerald-950/30'
      : 'bg-primary/10',
    borderFull: isDataScience ? 'border-emerald-500' : 'border-primary',
    text: isDataScience
      ? 'text-emerald-700 dark:text-emerald-300'
      : 'text-primary',
    dot: isDataScience ? 'bg-emerald-500' : 'bg-primary',
    badge: isDataScience
      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
      : 'bg-primary/10 text-primary',
  } as const;

  const relevantSkills = aboutData.skillsMatrix.filter((category) =>
    ['Languages', 'Frameworks', 'Cloud & DevOps', 'Databases'].includes(
      category.category,
    ),
  );

  const relevantExperience = aboutData.experience
    .map((exp) => ({
      ...exp,
      bullets: exp.bullets.filter((b) =>
        ['api', 'react', 'node', '.net', 'docker', 'sql', 'platform'].some(
          (kw) => b.toLowerCase().includes(kw),
        ),
      ),
    }))
    .filter((exp) => exp.bullets.length > 0);

  const achievements = aboutData.dualExpertise.softwareEngineer.achievements;

  const relevantEducation = aboutData.education.map((edu) => ({
    ...edu,
    courses: edu.courses.filter((c) =>
      ['data structures', 'algorithms', 'systems', 'database', 'machine'].some(
        (kw) => c.toLowerCase().includes(kw),
      ),
    ),
  }));

  const certifications = aboutData.certifications.filter((cert) => {
    const t = cert.title.toLowerCase();
    return (
      t.includes('microservices') ||
      t.includes('spring') ||
      t.includes('deep learning') ||
      t.includes('sensor')
    );
  });

  return {
    title,
    primaryIcon: isDataScience ? Brain : Code,
    isDataScience,
    iconColor: isDataScience ? 'text-emerald-600' : 'text-primary',
    accentClasses,
    professionalSummary: resume.summary,
    quote: aboutData.professionalSummary.quote,
    relevantSkills,
    relevantExperience,
    achievements,
    relevantEducation,
    certifications,
  } as const;
};
