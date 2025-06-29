// About page data - centralized for easy management and security
import type { Certificate } from '@/types';

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
    experience: '1.5+',
    projects: '10+',
    gpa: '3.67',
    publications: '1',
  },
  professionalSummary: {
    description:
      'Software engineer and data scientist with experience in machine learning, computer vision, and full-stack development. Specialized in transforming research concepts into practical applications through modern development practices. Passionate about building scalable solutions that bridge academic research with real-world implementation.',
    quote: "Let's build the future of technology together.",
  },
  dualExpertise: {
    dataScientist: {
      title: 'Data Scientist / ML Engineer',
      achievements: [
        'Implemented sensor fusion algorithms for autonomous vehicle applications',
        'Developed NLP chatbot models with improved performance metrics',
        'Conducted computer vision research with practical applications',
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
        'Built scalable mock-server platform serving development teams',
        'Contributed to development process optimization and quality improvements',
        'Gained experience in full-stack development and API design',
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
      role: 'Student Intern',
      period: 'Jan 2023 → May 2023',
      bullets: [
        'Built comprehensive MERN stack mock-server platform with multiple API endpoints',
        'Developed a robust mock server service application delivering a fully functional solution that simulated over 15 API endpoints within 3 months',
        'Designed and implemented secure user login, registration, and authentication modules that boosted system efficiency by 35% and reduced error rates by 20%',
        'Followed agile development methodologies, contributing to a 25% faster feature delivery cycle by participating in daily stand-ups and sprint ceremonies',
        'Collaborated with a team of 5 developers through code reviews, unit testing and debugging sessions which decreased critical bugs by 40%',
        'Leveraged MongoDB, Express.js, React and Node.js to build a reliable, scalable application, enhancing overall performance by 30%',
        'Integrated industry-standard security protocols into application components, ensuring robust data protection and improved user trust',
        'Contributed to brainstorming that led to 3 innovative features, significantly enhancing functionality and user experience',
      ],
    },
    {
      company: 'Tech Mahindra',
      role: 'Student Intern',
      period: 'Jul 2022 → Dec 2022',
      bullets: [
        'Integrated backend systems using Node.js and Auth0 to implement robust user authentication, securing access for over 500 daily users',
        'Developed an Admin Dashboard consolidating data sources and delivering real-time analytics, improving decision-making efficiency by 30%',
        'Designed and deployed dynamic micro-services to record and store form responses, processing 1,000+ submissions per day on a scalable cloud architecture',
      ],
    },
    {
      company: 'C-DAC',
      role: 'Research & Development Intern',
      period: 'Jan 2022 → Jun 2022',
      bullets: [
        'Developed real-time brainwave processing web service using modern technologies',
        'Led the front-end development with the PERN stack and integrated FastAPI for robust API connectivity with the P300 controller',
        'Engineered a scalable service that processes real-time brainwave data, supporting over 500 active sessions daily',
        'Implemented multi-level access controls ensuring secure and personalized experiences for diverse user roles',
        'Collaborated with cross-functional teams to achieve 99.9% uptime and improved application reliability',
        'Improved data processing efficiency by 30% through rigorous testing and optimization of front-end and back-end components',
      ],
    },
  ],
  education: [
    {
      degree: 'M.S. Computational Data Science',
      school: 'University of California, Riverside',
      gpa: '3.67',
      courses: ['Big Data', 'AI', 'Spatial Computing', 'ML'],
    },
  ],
  certifications: [
    {
      title: 'Sensor Fusion Nanodegree',
      provider: 'Udacity',
      year: '2024',
      month: 'Oct',
      filePath: '/certificates/Udacity Sensor Fusion Certificate.pdf',
      description: 'Advanced sensor fusion techniques for autonomous systems',
    },
    {
      title: 'Microservices with Java Spring Boot and Spring Cloud',
      provider: 'Udemy',
      year: '2022',
      month: 'Nov',
      filePath:
        '/certificates/Microservices with Java Spring Boot  and Spring Cloud - udemy.pdf',
      description:
        'Comprehensive microservices architecture with Spring ecosystem',
    },
    {
      title: 'Solidity Smart Contract Programming for Ethereum Blockchain',
      provider: 'Infosys',
      year: '2022',
      month: 'Apr',
      filePath:
        '/certificates/Solidity Smart Contract Programming for Ethereum Blockchain.pdf',
      description: 'Blockchain development and smart contract programming',
    },
    {
      title: 'Dell Artificial Intelligence Foundations',
      provider: 'Dell Technologies',
      year: '2022',
      month: 'Feb',
      filePath: '/certificates/DELL_Certificate-ML.pdf',
      description: 'Foundational AI concepts and machine learning principles',
    },
    {
      title: 'Deep Learning and NLP A-Z: How to create a ChatBot',
      provider: 'Udemy',
      year: '2021',
      month: 'Nov',
      filePath: '/certificates/DNLP A-z How to create a chatbot udemy.pdf',
      description: 'Natural language processing and chatbot development',
    },
    {
      title: 'Machine Learning A-Z: Hands on Python & R In Data Science',
      provider: 'Udemy',
      year: '2021',
      month: 'Sep',
      filePath: '/certificates/Machine learning Basics-Udemy.pdf',
      description: 'Comprehensive machine learning with Python and R',
    },
    {
      title: 'Fundamentals of Deep Learning',
      provider: 'NVIDIA',
      year: '2021',
      month: 'Aug',
      filePath:
        '/certificates/Fundamentals Of Deep Learning DLI C-FX-01 Certificate _ Deep Learning Institute.pdf',
      description:
        'Deep learning fundamentals and neural network architectures',
    },
    {
      title: 'CCNAv7: Introduction to Networks',
      provider: 'Cisco',
      year: '2021',
      month: 'May',
      filePath: '/certificates/AdityaGambhir-CCNA v7 module 1-certificate.pdf',
      description: 'Network fundamentals and Cisco networking technologies',
    },
    {
      title: 'Javascript Course 2021: From Zero to Expert',
      provider: 'Udemy',
      year: '2021',
      month: 'Mar',
      filePath: '/certificates/JavaScriptBasic-Udemy.pdf',
      description: 'Modern JavaScript development and ES6+ features',
    },
    {
      title: 'Object-Oriented Data Structures in C++',
      provider: 'Coursera',
      year: '2020',
      month: 'Oct',
      filePath:
        '/certificates/Object Oriented Data Structures of C++ - Coursera.pdf',
      description: 'Advanced C++ programming and data structures',
    },
    {
      title: 'Programming for Everybody (Getting Started with Python)',
      provider: 'Coursera',
      year: '2020',
      month: 'Aug',
      filePath: '/certificates/Python-Coursera.pdf',
      description: 'Python programming fundamentals and best practices',
    },
  ],
  publications: [
    {
      id: '1',
      title: 'A Comprehensive Survey of Multiple Object Tracking Techniques.',
      journal: 'IJISAE',
      year: '2024',
      url: 'https://ijisae.org/index.php/IJISAE/article/view/5486',
      abstract:
        "Multiple Object Tracking (MOT) is crucial in computer vision and surveillance, especially for automating traffic control in challenging traffic environments. This review surveys advancements in object detection, tracking algorithms, lane departure warnings, and semantic segmentation, with a specific focus on traffic law enforcement. It covers issues like wrong-way, clearway, and one-way traffic violations, as well as challenges including occlusion and splits. Various methods, such as background subtraction and deep learning, are explored.The review stresses the significance of analyzing recent literature for researchers to bridge gaps, overcome limitations, and create new algorithms. It also touches on hardware, datasets, metrics, and research directions. Future MOT research aims to develop efficient algorithms for dynamic tracking, improve detection accuracy, and reduce real-time processing. The survey's proposed methods offer valuable references for tracking multiple objects in frame sequences.",
    },
  ],
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
  // Contact location (used across site)
  location: 'Los Angeles, CA',
};
