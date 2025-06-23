import { ProjectData } from '@/types';

// Project data - centralized for easy management and future expansion
export const featuredProjects: ProjectData[] = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web app for managing tasks.',
    bullets: ['React', 'Node.js', 'MongoDB'],
    imageSrc: '/projects/project1.svg',
    imageAlt: 'Project Alpha task management interface',
    priority: true,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    // githubUrl: 'https://github.com/username/project-alpha',
    // liveUrl: 'https://project-alpha.vercel.app',
  },
  {
    title: 'Project Beta',
    description: 'A machine learning pipeline for data analysis.',
    bullets: ['Python', 'Pandas', 'TensorFlow'],
    imageSrc: '/projects/project2.svg',
    imageAlt: 'Project Beta data analysis dashboard',
    priority: true,
    technologies: ['Python', 'Pandas', 'TensorFlow', 'Scikit-learn', 'Jupyter'],
    // githubUrl: 'https://github.com/username/project-beta',
    // liveUrl: 'https://project-beta.herokuapp.com',
  },
];

// All projects (for the projects page)
export const allProjects: ProjectData[] = [
  ...featuredProjects,
  // Add more projects here as needed
  {
    title: 'Project Gamma',
    description: 'A mobile app for fitness tracking.',
    bullets: ['React Native', 'Firebase', 'Redux'],
    imageSrc: '/projects/project3.svg',
    imageAlt: 'Project Gamma fitness tracking app',
    priority: false,
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    // githubUrl: 'https://github.com/username/project-gamma',
  },
];

// Filter functions for different project categories
export const getProjectsByTechnology = (tech: string): ProjectData[] => {
  return allProjects.filter((project) =>
    project.technologies?.some((t) =>
      t.toLowerCase().includes(tech.toLowerCase()),
    ),
  );
};

export const getFeaturedProjects = (): ProjectData[] => {
  return featuredProjects;
};

export const getAllProjects = (): ProjectData[] => {
  return allProjects;
};
