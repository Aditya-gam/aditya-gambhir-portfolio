// About page data - centralized for easy management and security
export interface AboutData {
  hero: {
    name: string;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    resumes: {
      ds: string;
      sde: string;
    };
  };
  stats: {
    experience: string;
    projects: string;
    gpa: string;
    publications: string;
  };
  professionalSummary: {
    description: string;
    quote: string;
  };
  dualExpertise: {
    dataScientist: {
      title: string;
      achievements: string[];
      technologies: string[];
    };
    softwareEngineer: {
      title: string;
      achievements: string[];
      technologies: string[];
    };
  };
  skillsMatrix: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    school: string;
    gpa: string;
    courses: string[];
  };
  certifications: {
    title: string;
    provider: string;
    year: string;
  }[];
  publications: {
    title: string;
    journal: string;
    year: string;
    quote: string;
  };
  community: {
    organization: string;
    role: string;
    period: string;
    description: string;
  };
  personalTouch: {
    favoriteStack: string;
    hobbies: string[];
  };
}

export const aboutData: AboutData = {
  hero: {
    name: 'Aditya Gambhir',
    title:
      'Full-Stack Developer & AI Enthusiast bridging data science and software engineering.',
    description:
      'M.S. Computational Data Science graduate transforming cutting-edge ML, computer vision and real-time sensor fusion into scalable, user-centric software.',
    image: {
      src: '/headshot1.webp',
      alt: 'Aditya Gambhir',
    },
    resumes: {
      ds: '/Aditya_Gambhir_DS.pdf',
      sde: '/Aditya_Gambhir_SDE.pdf',
    },
  },
  stats: {
    experience: '2+',
    projects: '10+',
    gpa: '3.67',
    publications: '1',
  },
  professionalSummary: {
    description:
      'Experienced software engineer and data scientist with a proven track record of delivering scalable solutions that bridge the gap between cutting-edge research and practical applications. Specialized in machine learning, computer vision, and real-time sensor fusion technologies, with extensive experience in full-stack development and cloud architecture. Passionate about transforming complex algorithms into user-friendly, production-ready systems that drive business value and innovation.',
    quote: "Let's push the boundaries of autonomous systems together.",
  },
  dualExpertise: {
    dataScientist: {
      title: 'Data Scientist / ML Engineer',
      achievements: [
        'Achieved RMSE < 0.5m on sensor fusion projects',
        'Improved BLEU scores by +35% in NLP tasks',
        'Led computer vision research with measurable impact',
      ],
      technologies: [
        'PyTorch',
        'Vision-Transformers',
        'Kalman Filter',
        'OpenCV',
      ],
    },
    softwareEngineer: {
      title: 'Software Engineer (Backend & Full-Stack)',
      achievements: [
        'Built logistics mock-server for 500+ developers',
        'Reduced development cycle time by 35%',
        'Decreased contract-related bugs by 40%',
      ],
      technologies: ['Node.js', 'Spring Boot', 'AWS', 'CI/CD'],
    },
  },
  skillsMatrix: [
    {
      category: 'Languages',
      items: ['C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
    },
    {
      category: 'Frameworks',
      items: ['React', 'Node.js', 'Spring Boot', 'FastAPI'],
    },
    {
      category: 'Data / AI',
      items: ['Pandas', 'NumPy', 'TensorFlow', 'Keras', 'OpenCV'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'MySQL'],
    },
    {
      category: 'Tooling',
      items: ['Git', 'GitHub Actions', 'Jenkins', 'Jira'],
    },
  ],
  experience: [
    {
      company: 'Tech Mahindra',
      role: 'Software Development Intern',
      period: 'Jun 2022 → May 2023',
      bullets: [
        'Built MERN mock-server with 15+ endpoints for 500+ developers',
        'Reduced contract-related bugs by 40% and delivery time by 25%',
      ],
    },
    {
      company: 'C-DAC',
      role: 'R&D Intern',
      period: 'Jan 2022 → Jun 2022',
      bullets: [
        'Developed real-time brainwave web service for 500+ users',
        'Achieved 99.9% uptime through rigorous testing protocols',
      ],
    },
  ],
  education: {
    degree: 'M.S. Computational Data Science',
    school: 'University of California, Riverside',
    gpa: '3.67',
    courses: ['Big Data', 'AI', 'Spatial Computing', 'ML'],
  },
  certifications: [
    {
      title: 'Sensor Fusion Nanodegree',
      provider: 'Udacity',
      year: '2024',
    },
    {
      title: 'Microservices w/ Spring Boot',
      provider: 'Udemy',
      year: '2022',
    },
    { title: 'Dell AI Foundations', provider: 'Dell', year: '2022' },
    { title: 'CCNA v7', provider: 'Cisco', year: '2021' },
    {
      title: 'Fundamentals of Deep Learning',
      provider: 'NVIDIA',
      year: '2021',
    },
  ],
  publications: {
    title: 'A Comprehensive Survey of Multiple Object Tracking Techniques.',
    journal: 'IJISAE',
    year: '2024',
    quote:
      'I actively publish and peer-review research to stay at the forefront of computer-vision innovation.',
  },
  community: {
    organization: 'ML Forum VIIT',
    role: 'Core Committee Member',
    period: '2021-2022',
    description:
      'Led workshops on deep learning for 80+ students, fostering the next generation of AI practitioners.',
  },
  personalTouch: {
    favoriteStack: 'MERN + AWS',
    hobbies: [
      '☕ Always brewing the perfect cup',
      '🎸 Strumming in spare time',
    ],
  },
};
