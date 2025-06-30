// About page data – centralized for easy management and security
import type { Certificate } from '@/types';

export interface AboutData {
  hero: {
    greeting: string;
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
  }[];
  certifications: readonly Certificate[];
  publications: {
    id: string;
    title: string;
    journal: string;
    year: string;
    url: string;
    abstract: string;
  }[];
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
  /** Current city / location string, e.g. "Los Angeles, CA" */
  location: string;
}

export const aboutData: AboutData = {
  // ────────────────────────────────────────────
  // HERO
  // ────────────────────────────────────────────
  hero: {
    greeting: "Hello, I'm Aditya",
    name: 'Aditya Gambhir',
    title:
      'M.S. Computational Data Science • Full-Stack Developer & AI Enthusiast',
    description:
      'Software & ML engineer turning sensor, geospatial, and text data into real-time, cloud-native products. Experienced across MERN, Spring Boot, and distributed ML pipelines for computer vision, sensor fusion, and analytics.',
    image: {
      src: '/headshot1.webp',
      alt: 'Aditya Gambhir',
    },
    resumes: {
      ds: '/Aditya_Gambhir_DS.pdf',
      sde: '/Aditya_Gambhir_SDE.pdf',
    },
  },

  // ────────────────────────────────────────────
  // QUICK STATS
  // ────────────────────────────────────────────
  stats: {
    experience: '1.5+',
    projects: '10+',
    gpa: '3.67',
    publications: '1',
  },

  // ────────────────────────────────────────────
  // PROFESSIONAL SUMMARY
  // ────────────────────────────────────────────
  professionalSummary: {
    description:
      'Data-driven software engineer and ML researcher with an M.S. in Computational Data Science (UC Riverside). I specialise in building scalable back-end services and machine-learning pipelines that transform raw data into actionable insights, with proven results in computer vision, real-time sensor fusion, and geospatial analytics.',
    quote: 'Turning data into dynamic products.',
  },

  // ────────────────────────────────────────────
  // DUAL EXPERTISE
  // ────────────────────────────────────────────
  dualExpertise: {
    dataScientist: {
      title: 'Data Scientist / ML Engineer',
      achievements: [
        'Fused LiDAR, RADAR & camera data with UKF, achieving < 0.5 m RMSE in highway simulation',
        'Developed transformer-based crowd-localisation model with 12 % accuracy lift across 5 datasets',
        'Designed time-series pipelines for financial KPI forecasting and anomaly detection',
      ],
      technologies: [
        'PyTorch',
        'TensorFlow',
        'OpenCV',
        'Kalman Filter',
        'Spark',
      ],
    },
    softwareEngineer: {
      title: 'Software Engineer (Backend & Full-Stack)',
      achievements: [
        'Architected MERN mock-server platform with 15 + endpoints, cutting feature cycle time by 35 %',
        'Built Auth0-secured microservices & dashboards serving 500 + daily users',
        'Containerised and deployed full-stack apps via Docker & GitHub Actions, sustaining 99.9 % uptime',
      ],
      technologies: [
        'Node.js',
        'React',
        'Spring Boot',
        'FastAPI',
        'Docker',
        'AWS',
      ],
    },
  },

  // ────────────────────────────────────────────
  // SKILLS MATRIX
  // ────────────────────────────────────────────
  skillsMatrix: [
    {
      category: 'Languages',
      items: [
        'C', // scripting & systems
        'C++',
        'Java',
        'Python',
        'JavaScript',
        'TypeScript',
        'SQL',
        'Bash',
        'R',
      ],
    },
    {
      category: 'Frontend & UI',
      items: [
        'React',
        'Next.js',
        'Angular (basic)',
        'Tailwind CSS',
        'HTML5 / CSS3',
        'D3.js',
        'Streamlit',
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        'Node.js',
        'Express.js',
        'Spring Boot',
        'FastAPI',
        'GraphQL',
        'REST',
        'Microservices',
      ],
    },
    {
      category: 'Data / AI Libraries',
      items: [
        'Pandas',
        'NumPy',
        'TensorFlow',
        'PyTorch',
        'Scikit-learn',
        'Keras',
        'OpenCV',
        'Transformers',
        'Seaborn',
        'Matplotlib',
        'SpaCy',
      ],
    },
    {
      category: 'Big Data & Analytics',
      items: ['Apache Spark', 'Hadoop', 'Kafka', 'Snowflake', 'BigQuery'],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        'AWS (EC2, S3, Lambda)',
        'GCP',
        'Azure',
        'Docker',
        'Kubernetes',
        'GitLab CI/CD',
        'GitHub Actions',
        'Jenkins',
        'Linux (Ubuntu)',
        'Monitoring & Observability',
      ],
    },
    {
      category: 'Databases & Storage',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
    },
    {
      category: 'Tooling & Productivity',
      items: [
        'Git',
        'Jira',
        'VS Code',
        'IntelliJ IDEA',
        'Jupyter Notebook',
        'Postman',
        'Excel',
        'Tableau',
        'Power BI',
        'Pytest',
      ],
    },
  ],

  // ────────────────────────────────────────────
  // EXPERIENCE
  // ────────────────────────────────────────────
  experience: [
    {
      company: 'Tech Mahindra',
      role: 'Software Development Intern',
      period: 'Jan 2023 → May 2023',
      bullets: [
        'Delivered a MERN mock-server platform simulating 15 + endpoints, boosting developer productivity',
        'Implemented secure auth modules that cut error rates by 20 % and improved efficiency by 35 %',
        'Collaborated in Agile rituals, accelerating feature delivery by 25 %',
        'Performed code reviews and unit testing that reduced critical bugs by 40 %',
        'Optimised performance by 30 % using MongoDB, Express.js, React & Node.js',
      ],
    },
    {
      company: 'Tech Mahindra',
      role: 'Software Development Intern',
      period: 'Jul 2022 → Dec 2022',
      bullets: [
        'Integrated backend systems with Node.js & Auth0, securing 500 + daily users',
        'Built an Admin Dashboard delivering real-time analytics, improving decisions by 30 %',
        'Designed micro-services processing 1 000 + submissions per day on cloud-native infra',
      ],
    },
    {
      company: 'Centre for Development of Advanced Computing (C-DAC)',
      role: 'Research & Development Intern',
      period: 'Jan 2022 → Jun 2022',
      bullets: [
        'Led PERN-stack front-end and FastAPI backend for real-time brain-wave analysis',
        'Scaled service to 500 + concurrent sessions with 99.9 % uptime',
        'Implemented multi-level access control and improved processing efficiency by 30 %',
      ],
    },
  ],

  // ────────────────────────────────────────────
  // EDUCATION
  // ────────────────────────────────────────────
  education: [
    {
      degree: 'M.S. Computational Data Science',
      school: 'University of California, Riverside',
      gpa: '3.67/4',
      courses: [
        'Big Data Management',
        'Spatial Computing',
        'Machine Learning',
        'Advanced Computer Vision',
      ],
    },
    {
      degree: 'B.Tech Computer Engineering',
      school: 'Vishwakarma Institute of Information Technology',
      gpa: '9.62/10',
      courses: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Database Management',
        'Computer Networks',
      ],
    },
  ],

  // ────────────────────────────────────────────
  // CERTIFICATIONS
  // ────────────────────────────────────────────
  certifications: [
    {
      title: 'Sensor Fusion Nanodegree',
      provider: 'Udacity',
      year: '2024',
      month: 'Oct',
      filePath: '/certificates/Udacity Sensor Fusion Certificate.pdf',
      description: 'Advanced sensor-fusion techniques for autonomous systems',
    },
    {
      title: 'Microservices with Java Spring Boot and Spring Cloud',
      provider: 'Udemy',
      year: '2022',
      month: 'Nov',
      filePath:
        '/certificates/Microservices with Java Spring Boot  and Spring Cloud - udemy.pdf',
      description: 'Comprehensive microservices architecture with Spring',
    },
    {
      title: 'Solidity Smart Contract Programming for Ethereum Blockchain',
      provider: 'Infosys',
      year: '2022',
      month: 'Apr',
      filePath:
        '/certificates/Solidity Smart Contract Programming for Ethereum Blockchain.pdf',
      description: 'Blockchain development & smart-contract programming',
    },
    {
      title: 'Dell Artificial Intelligence Foundations',
      provider: 'Dell Technologies',
      year: '2022',
      month: 'Feb',
      filePath: '/certificates/DELL_Certificate-ML.pdf',
      description: 'Foundational AI concepts and ML principles',
    },
    {
      title: 'Deep Learning and NLP A–Z: How to Create a Chatbot',
      provider: 'Udemy',
      year: '2021',
      month: 'Nov',
      filePath: '/certificates/DNLP A-z How to create a chatbot udemy.pdf',
      description: 'Natural-language processing & chatbot development',
    },
    {
      title: 'Machine Learning A–Z: Hands-On Python & R in Data Science',
      provider: 'Udemy',
      year: '2021',
      month: 'Sep',
      filePath: '/certificates/Machine learning Basics-Udemy.pdf',
      description: 'Comprehensive ML with Python and R',
    },
    {
      title: 'Fundamentals of Deep Learning',
      provider: 'NVIDIA',
      year: '2021',
      month: 'Aug',
      filePath:
        '/certificates/Fundamentals Of Deep Learning DLI C-FX-01 Certificate _ Deep Learning Institute.pdf',
      description: 'Neural-network fundamentals & GPU acceleration',
    },
    {
      title: 'CCNAv7: Introduction to Networks',
      provider: 'Cisco',
      year: '2021',
      month: 'May',
      filePath: '/certificates/AdityaGambhir-CCNA v7 module 1-certificate.pdf',
      description: 'Networking fundamentals & Cisco technologies',
    },
    {
      title: 'JavaScript Course 2021: From Zero to Expert',
      provider: 'Udemy',
      year: '2021',
      month: 'Mar',
      filePath: '/certificates/JavaScriptBasic-Udemy.pdf',
      description: 'Modern JavaScript development & ES6 + features',
    },
    {
      title: 'Object-Oriented Data Structures in C++',
      provider: 'Coursera',
      year: '2020',
      month: 'Oct',
      filePath:
        '/certificates/Object Oriented Data Structures of C++ - Coursera.pdf',
      description: 'Advanced C++ programming & data structures',
    },
    {
      title: 'Programming for Everybody (Getting Started with Python)',
      provider: 'Coursera',
      year: '2020',
      month: 'Aug',
      filePath: '/certificates/Python-Coursera.pdf',
      description: 'Python programming fundamentals',
    },
  ] as const,

  // ────────────────────────────────────────────
  // PUBLICATIONS
  // ────────────────────────────────────────────
  publications: [
    {
      id: '1',
      title: 'A Comprehensive Survey of Multiple Object Tracking Techniques',
      journal:
        'International Journal of Intelligent Systems and Applications in Engineering',
      year: '2024',
      url: 'https://ijisae.org/index.php/IJISAE/article/view/5486',
      abstract:
        "Multiple Object Tracking (MOT) is crucial in computer vision and surveillance, especially for automating traffic control in challenging traffic environments. This review surveys advancements in object detection, tracking algorithms, lane departure warnings, and semantic segmentation, with a specific focus on traffic law enforcement. It covers issues like wrong-way, clearway, and one-way traffic violations, as well as challenges including occlusion and splits. Various methods, such as background subtraction and deep learning, are explored.The review stresses the significance of analyzing recent literature for researchers to bridge gaps, overcome limitations, and create new algorithms. It also touches on hardware, datasets, metrics, and research directions. Future MOT research aims to develop efficient algorithms for dynamic tracking, improve detection accuracy, and reduce real-time processing. The survey's proposed methods offer valuable references for tracking multiple objects in frame sequences.",
    },
  ],

  // ────────────────────────────────────────────
  // COMMUNITY & PERSONAL
  // ────────────────────────────────────────────
  community: {
    organization: 'ML Forum – VIIT',
    role: 'Core Committee Member',
    period: '2021 – 2022',
    description:
      'Led workshops on deep learning for 80 + students, fostering the next generation of AI practitioners.',
  },

  personalTouch: {
    favoriteStack: 'MERN + AWS',
    hobbies: ['☕ Perfect-cup coffee geek', '🎸 Guitarist in spare time'],
  },

  // ────────────────────────────────────────────
  // LOCATION
  // ────────────────────────────────────────────
  location: 'Riverside, CA',
};
