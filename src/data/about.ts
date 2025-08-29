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
      'M.S. Computational Data Science • Full-Stack Developer • AI Applications Engineer',
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
      'I hold an M.S. in Computational Data Science from UC Riverside and build production-grade software end-to-end. My focus is backend and platform work, FastAPI/Node REST services, PostgreSQL/Redis, Docker/Kubernetes, and CI/CD paired with React/TypeScript UIs when needed. In industry, I delivered contract automation and analytics apps, hardened auth (OAuth2/OIDC), and shipped an internal mock-API service adopted by 500+ developers. I also work with data pipelines (Spark/Hadoop, PostGIS) for geospatial use cases. I’m currently learning and developing projects using agentic AI, exploring LLM apps, RAG, and tool-using agents, and applying software-engineering rigor to ship reliable products.',
    quote: 'Shipping reliable AI-powered software.',
  },

  // ────────────────────────────────────────────
  // DUAL EXPERTISE
  // ────────────────────────────────────────────
  dualExpertise: {
    dataScientist: {
      title: 'Data Scientist / ML Engineer',
      achievements: [
        'Built a transformer-based crowd-localization model in PyTorch with a 12% accuracy lift and fewer ambiguous detections, validated across five datasets',
        'Developed an NLP chatbot using Transformer, achieving BLEU 25.67, 35% higher than LSTM while optimizing cloud compute costs by 15%',
        'Implemented statistical anomaly detection in backend services via Jenkins CI/CD, flagging 5 critical issues and improving overall reliability by ~20%',
      ],
      technologies: [
        'PyTorch',
        'Transformers',
        'Scikit-Learn',
        'Pandas/NumPy',
        'Spark',
      ],
    },
    softwareEngineer: {
      title: 'Software Engineer (Backend & Full-Stack)',
      achievements: [
        'Delivered a Mock API service for 500+ developers to simulate 15+ REST endpoints, speeding integration tests by ~15%',
        'Automated contract intake with React 18 + TypeScript on Spring Boot REST (SQS + PostgreSQL), cutting processing time by 35%',
        'Hardened OAuth2/OIDC across microservices resolved 5 critical vulnerabilities and reduced PR review time by 20%',
        'Containerized and deployed services with Docker & Kubernetes + GitHub Actions; health checks + OpenAPI sustained 99.99% uptime',
      ],
      technologies: [
        'Node.js',
        'React/TypeScript',
        'Spring Boot',
        'FastAPI',
        'PostgreSQL',
        'Docker',
        'GitHub Actions',
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
      items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
    },
    {
      category: 'Frontend & UI',
      items: [
        'React',
        'React Hook Form',
        'Recharts',
        'React Hooks',
        'React Redux',
        'Next.js',
        'Tailwind CSS',
        'HTML5 / CSS3',
        'D3.js',
        'TanStack Table',
        'Leaflet.js',
        'Streamlit',
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        'Node.js',
        'Express.js',
        'FastAPI',
        'Django',
        'Flask',
        'REST',
        'Auth (OAuth2/OIDC, JWT)',
        'Prisma ORM',
        'Microservices',
        'GraphQL',
      ],
    },
    {
      category: 'Data / AI Libraries',
      items: [
        'Pandas',
        'NumPy',
        'TensorFlow',
        'Geopandas',
        'Shapely',
        'GDAL',
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
      items: [
        'Apache Spark',
        'Hadoop',
        'Kafka',
        'Snowflake',
        'BigQuery',
        'A/B Testing',
        'Data Mining',
        'Statistical Data Analysis',
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        'AWS (EC2, S3, Lambda)',
        'GCP',
        'Azure',
        'Docker',
        'Kubernetes',
        'Nginx',
        'Prometheus',
        'Grafana',
        'Sentry',
        'GitLab CI/CD',
        'GitHub Actions',
        'Jenkins',
        'Linux (Ubuntu)',
        'Monitoring & Observability',
      ],
    },
    {
      category: 'Databases & Storage',
      items: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'SQLite',
        'Redis',
        'TimeScaleDB',
        'ChromaDB',
        'PostGIS',
        'AWS Redshift',
        'AWS S3',
      ],
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
        'Prisma',
        'Swagger',
        'OpenAPI',
        'Excel',
        'Tableau',
        'Power BI',
        'Pytest',
        'Jest',
        'Vercel',
        'Render',
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
        'Built an internal Mock API service so teams could simulate 15–20 endpoints and test earlier, cutting integration test time by ~15%.',
        'Kept the service fast under load, with ~220 ms response times at 60–120 requests/second by adding server-side caching, sensible rate limits, and performance dashboards.',
        'Standardized sign-in and API security with OAuth2/OIDC via Okta, resolving 5 critical issues and strengthening our security posture.',
        'Reduced breaking changes by enforcing OpenAPI contracts in CI, blocking merges when code and spec didn’t match and auto-generating typed clients.',
        'Lifted team throughput ~25% (24→30 pts/sprint) and sped up PR reviews ~20% by introducing a clear Definition of Done, a concise PR template, and a 75% test-coverage gate.',
      ],
    },
    {
      company: 'Tech Mahindra',
      role: 'Software Development Intern',
      period: 'Jul 2022 → Dec 2022',
      bullets: [
        'Replaced PDF forms with a web intake, cutting contract processing time by ~35%; built a React front end with Spring Boot APIs and automated PDF/email notifications.',
        'Improved reliability and lowered typical API response from 1.3s to 0.85s by indexing PostgreSQL and moving email to background jobs; raised automated test coverage to ~80% backend / ~75% frontend.',
        'Launched a sales analytics dashboard that reduced time-to-insight by ~30%; delivered with React and a Node API, then sped up charts via query tuning and caching.',
        'Added role-based access (employees/managers/admins) with single sign-on via Auth0, reducing authentication errors by ~40%.',
        'Containerized services and set up Docker-based CI/CD to AWS, trimming manual deployment steps by ~25% and preventing spec-breaking changes.',
      ],
    },
    {
      company: 'Centre for Development of Advanced Computing (C-DAC)',
      role: 'Research & Development Intern',
      period: 'Jan 2022 → Jun 2022',
      bullets: [
        'Built a real-time EEG research platform that cut setup time by ~40% and increased daily recording throughput by 25-30%.',
        'Delivered smooth live charts with ~320 ms end-to-end latency while streaming ~240 messages per second over WebSockets.',
        'Maintained 99.9% service uptime (May-June) by adding proactive health checks and clear monitoring/alerts.',
        'Secured a multi-user lab with single sign-on and role-based permissions; every endpoint was authenticated and fully audited.',
        'Reduced infrastructure and storage costs by ~52% and sped up releases through automated build/deploy pipelines.',
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
        'Data Mining',
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
        'Computer Networks',
        'Software Engineering',
        'Database Management',
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
