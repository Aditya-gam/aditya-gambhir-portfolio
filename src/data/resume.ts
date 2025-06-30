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
  /** Short role/specialisation label shown inside the modal (e.g. "Software Engineer", "Data Scientist") */
  readonly roleTitle: string;
  /** Candidate's name – duplicated here so that the modal pulls all content from this file only */
  readonly name?: string;
  /** Current location string */
  readonly location?: string;
}

export const resumeData: readonly ResumeData[] = [
  // ───────────────────────────────────────────
  // SOFTWARE-ENGINEER / FULL-STACK TRACK
  // ───────────────────────────────────────────
  {
    id: 'sde',
    title: 'Software Engineer Resume',
    filename: 'Aditya_Gambhir_SDE.pdf',
    downloadName: 'Aditya_Gambhir_Software_Engineer_Resume.pdf',
    description:
      'Results-oriented software-engineering CV spotlighting full-stack delivery (MERN, Spring Boot), cloud-native deployment, and DevOps leadership in Agile environments.',
    summary:
      'Data-driven software engineer (M.S. Computational Data Science, UC Riverside) who designs and ships resilient backend services, real-time dashboards, and micro-service architectures. Adept with Node.js, Java/Spring, React, and containerised AWS/GCP stacks that sustain 99.9 % uptime and accelerate feature throughput by >25 %.',
    highlights: [
      'Full-Stack Development • MERN & Spring Boot',
      'Cloud-Native Deployment • AWS / Docker / Kubernetes',
      'CI/CD Automation • GitHub Actions, Jenkins',
      'System Design & Performance Optimisation',
      'Geospatial & Logistics Projects (Navigate LA28, Dockership)',
    ],
    targetAudience:
      'Backend / Full-Stack / Platform Engineering and DevOps-focused roles',
    lastUpdated: '2025-06-30',
    fileSize: '114 KB',
    type: 'sde',
    roleTitle: 'Software Engineer',
    name: 'Aditya Gambhir',
    location: 'Riverside, CA',
  },

  // ───────────────────────────────────────────
  // DATA-SCIENCE / ML TRACK
  // ───────────────────────────────────────────
  {
    id: 'ds',
    title: 'Data Science Resume',
    filename: 'Aditya_Gambhir_DS.pdf',
    downloadName: 'Aditya_Gambhir_Data_Science_Resume.pdf',
    description:
      'Specialised ML/AI résumé showcasing computer-vision research, real-time sensor-fusion pipelines, and big-data analytics expertise.',
    summary:
      'Machine-learning researcher and engineer (M.S. Computational Data Science, UC R) skilled in building ETL pipelines, deep-learning models, and analytics dashboards that turn multimodal data (LiDAR, RADAR, imagery, text) into actionable insights. Proven impact on autonomous-systems safety, crowd-analytics accuracy (+12 %), and KPI forecasting.',
    highlights: [
      'Deep Learning • TensorFlow & PyTorch',
      'Computer Vision & Sensor Fusion (LiDAR/RADAR/Camera)',
      'Big-Data Analytics • Spark, Hadoop, Kafka',
      'Statistical Modelling & Forecasting',
      'End-to-End Data Pipelines & ETL',
    ],
    targetAudience: 'Data-Science, ML Engineering, Applied-Research positions',
    lastUpdated: '2025-06-30',
    fileSize: '114 KB',
    type: 'ds',
    roleTitle: 'Data Scientist',
    name: 'Aditya Gambhir',
    location: 'Riverside, CA',
  },
] as const;

export const getResumeById = (id: string): ResumeData | undefined =>
  resumeData.find((resume) => resume.id === id);

export const getAllResumes = (): readonly ResumeData[] => resumeData;

// ---------------------------------------------------------------------------
// Helper to construct dynamic content for the <ResumeModal /> component.
// Keeping the UI-specific derivations here ensures that the modal component
// itself contains ZERO hard-coded business content, fulfilling the
// source-of-truth requirement.
// ---------------------------------------------------------------------------

export const getResumeModalContent = (resume: ResumeData) => {
  const isDataScience = resume.type === 'ds';

  const title =
    resume.roleTitle ??
    (isDataScience ? 'Data Scientist' : 'Software Engineer');

  // Utilities for accent colours depending on specialisation
  const accentClasses = {
    border: isDataScience ? 'border-l-emerald-500' : 'border-l-blue-500',
    bg: isDataScience
      ? 'bg-emerald-50 dark:bg-emerald-950/30'
      : 'bg-blue-50 dark:bg-blue-950/30',
    borderFull: isDataScience ? 'border-emerald-500' : 'border-blue-500',
    text: isDataScience
      ? 'text-emerald-700 dark:text-emerald-300'
      : 'text-blue-700 dark:text-blue-300',
    dot: isDataScience ? 'bg-emerald-500' : 'bg-blue-500',
    badge: isDataScience
      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  } as const;

  // Derive role specific slices from the larger aboutData object so we
  // don't duplicate every nested list in this file. Only logic – not hard-coded –
  // is kept here, hence the single source-of-truth remains resume.ts.
  const relevantSkills = isDataScience
    ? aboutData.skillsMatrix.filter((category) =>
        [
          'Languages',
          'Data / AI',
          'Data / AI Libraries',
          'Cloud & DevOps',
          'Tooling',
          'Tooling & Productivity',
        ].includes(category.category),
      )
    : aboutData.skillsMatrix.filter((category) =>
        [
          'Languages',
          'Frameworks',
          'Cloud & DevOps',
          'Databases',
          'Databases & Storage',
        ].includes(category.category),
      );

  const relevantExperience = aboutData.experience
    .map((exp) => ({
      ...exp,
      bullets: isDataScience
        ? exp.bullets.filter((b) =>
            ['data', 'ml', 'analytics', 'python'].some((kw) =>
              b.toLowerCase().includes(kw),
            ),
          )
        : exp.bullets.filter((b) =>
            ['mern', 'react', 'node', 'api', 'micro', 'docker'].some((kw) =>
              b.toLowerCase().includes(kw),
            ),
          ),
    }))
    .filter((exp) => exp.bullets.length > 0);

  const achievements = isDataScience
    ? aboutData.dualExpertise.dataScientist.achievements
    : aboutData.dualExpertise.softwareEngineer.achievements;

  const relevantEducation = aboutData.education.map((edu) => ({
    ...edu,
    courses: isDataScience
      ? edu.courses.filter((c) =>
          ['data', 'machine', 'vision', 'big'].some((kw) =>
            c.toLowerCase().includes(kw),
          ),
        )
      : edu.courses.filter((c) =>
          ['data structures', 'algorithms', 'systems', 'database'].some((kw) =>
            c.toLowerCase().includes(kw),
          ),
        ),
  }));

  const certifications = aboutData.certifications.filter((cert) => {
    const t = cert.title.toLowerCase();
    if (isDataScience) {
      return (
        t.includes('sensor') ||
        t.includes('deep learning') ||
        t.includes('machine learning') ||
        t.includes('ai') ||
        t.includes('data')
      );
    }
    return (
      t.includes('microservices') ||
      t.includes('spring') ||
      t.includes('javascript') ||
      t.includes('programming')
    );
  });

  return {
    // Header / badges -------------------------------------------------------
    title,
    primaryIcon: isDataScience ? Brain : Code,
    isDataScience,
    iconColor: isDataScience ? 'text-emerald-600' : 'text-blue-600',
    accentClasses,

    // Top-level summary ------------------------------------------------------
    professionalSummary: resume.summary,
    quote: aboutData.professionalSummary.quote,

    // Body sections ---------------------------------------------------------
    relevantSkills,
    relevantExperience,
    achievements,
    relevantEducation,
    certifications,
  } as const;
};
