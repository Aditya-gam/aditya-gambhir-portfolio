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
      'Backend-focused CV highlighting API platforms, auth, and delivery: FastAPI/Node/Spring Boot services, PostgreSQL with Redis caching, Docker/Kubernetes on AWS, OpenAPI-first development, and CI/CD. Includes select data work tied to product impact, with ongoing learning in agentic AI',
    summary:
      'Software engineer (M.S., UC Riverside) who ships reliable backends and internal tools that move metrics. Mock API service adopted by 500+ developers, contract intake that cut processing time by ~35%, and analytics dashboards that reduced time-to-insight by ~30%. Skilled with FastAPI, Node, React/TypeScript, PostgreSQL/Redis, Docker/Kubernetes, and AWS. Currently learning agentic AI and building projects with RAG and tool-using agents',
    highlights: [
      'Full-Stack Development • FastAPI & Spring Boot',
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
      'Applied ML/AI résumé highlighting Transformers-driven computer vision and NLP, data analytics at scale (Spark), and MLOps/CI/CD. Emphasizes measurable impact in reliability and security, with only a light touch on sensor fusion.',
    summary:
      'Machine learning engineer (M.S., UC Riverside) who ships models and analytics that move metrics: +12% crowd-localization lift with a PyTorch Transformer; a chatbot at BLEU 25.67 (+35% vs. LSTM); and anomaly detection that flagged 5 critical issues (+20% reliability). Built real-time analytics on FastAPI/PostgreSQL with sub-500 ms latency. Currently exploring agentic-AI patterns (e.g., RAG, tool-using agents) and applying software-engineering rigor end-to-end.',

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
