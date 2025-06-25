export interface ResumeData {
  readonly id: string;
  readonly title: string;
  readonly filename: string;
  readonly downloadName: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly targetAudience: string;
  readonly lastUpdated: string;
  readonly fileSize: string;
  readonly type: 'sde' | 'ds';
}

export const resumeData: readonly ResumeData[] = [
  {
    id: 'sde',
    title: 'Software Engineer Resume',
    filename: 'Aditya_Gambhir_SDE.pdf',
    downloadName: 'Aditya_Gambhir_Software_Engineer_Resume.pdf',
    description:
      'Comprehensive software engineering resume highlighting full-stack development expertise, MERN stack proficiency, and enterprise-level project experience.',
    highlights: [
      'Full-Stack Development (MERN)',
      'Enterprise Software Solutions',
      'CI/CD & DevOps Practices',
      'System Architecture Design',
      'API Development & Integration',
    ],
    targetAudience:
      'Software Engineering roles, Full-Stack positions, Backend development',
    lastUpdated: '2024-12-08',
    fileSize: '2.1 MB',
    type: 'sde',
  },
  {
    id: 'ds',
    title: 'Data Science Resume',
    filename: 'Aditya_Gambhir_DS.pdf',
    downloadName: 'Aditya_Gambhir_Data_Science_Resume.pdf',
    description:
      'Specialized data science resume showcasing machine learning expertise, computer vision projects, and advanced analytics capabilities.',
    highlights: [
      'Machine Learning & AI',
      'Computer Vision & NLP',
      'Deep Learning Frameworks',
      'Statistical Analysis & Modeling',
      'Data Pipeline Development',
    ],
    targetAudience: 'Data Science roles, ML Engineering, Research positions',
    lastUpdated: '2024-12-08',
    fileSize: '2.3 MB',
    type: 'ds',
  },
] as const;

export const getResumeById = (id: string): ResumeData | undefined =>
  resumeData.find((resume) => resume.id === id);

export const getAllResumes = (): readonly ResumeData[] => resumeData;
