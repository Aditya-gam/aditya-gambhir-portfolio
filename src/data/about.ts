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
    title: 'Software Engineer • Applied AI & LLM Systems • Full-Stack',
    description:
      'Software engineer building and measuring LLM systems and multi-tenant platforms in regulated healthcare. At Healthcare Support I own four systems end to end — from schema and model pipeline to the on-premises servers they run on.',
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
    experience: '2.5+',
    projects: '10+',
    gpa: '3.67',
    publications: '1',
  },

  // ────────────────────────────────────────────
  // PROFESSIONAL SUMMARY
  // ────────────────────────────────────────────
  professionalSummary: {
    description:
      'I build and own software end to end at a medical-evaluation company — schema to deploy — where the compliance constraints are architecture rather than paperwork. In my first four months I shipped four systems: a ground-up rewrite of a seven-year-old clinical scheduling platform, an LLM pipeline that turns hundreds of pages of scanned medical records into a physician-ready review, a self-hosted telehealth video service, and the company public site. Three run on dedicated on-premises servers I provisioned. The work I would most want to be judged on is the measurement: a five-method model bake-off against ground truth I hand-labelled, a published ceiling on that ground truth rather than a score quoted against a perfect 1.0, and four candidate improvements rejected on evidence — one of them against an accuracy bar declared before the experiment ran.',
    quote:
      'Knowing which parts of a number are recoverable matters more than the number.',
  },

  // ────────────────────────────────────────────
  // DUAL EXPERTISE
  // ────────────────────────────────────────────
  dualExpertise: {
    dataScientist: {
      title: 'AI / ML Engineer',
      achievements: [
        'Ran a five-method bake-off for medical-record page-stream segmentation against hand-labelled ground truth; the winning method beat the rest on accuracy, recall, and cost at once',
        'Proved document segmentation is a vision task rather than a text task by replicating a published OCR approach and measuring recall collapse from 0.92 to 0.66',
        'Built a three-tier classification cascade — ordered regex, a local embedding model, then a constrained-enum LLM call — where two independent signals must agree before a document is auto-classified',
      ],
      technologies: [
        'Gemini / Vertex AI',
        'Python',
        'FastAPI',
        'PyTorch',
        'sentence-transformers',
        'pgvector',
      ],
    },
    softwareEngineer: {
      title: 'Software Engineer (Backend & Full-Stack)',
      achievements: [
        'Migrated a multi-tenant clinical platform to one physical database per clinic office, proving isolation with a harness that disables the framework tenant filter',
        'Built two transactional outboxes with SHA-256 idempotency keys and atomic database-lease claiming so concurrent workers never double-send',
        'Rebuilt a 7-year-old platform on .NET 10 and Angular 20 and deployed it to an on-premises Ubuntu server I provisioned',
        'Delivered a mock API service adopted by 500+ developers to simulate 15+ REST endpoints, cutting integration-testing time ~15%',
      ],
      technologies: [
        '.NET 10',
        'Angular 20',
        'Next.js',
        'FastAPI',
        'PostgreSQL',
        'SQL Server',
        'Docker',
      ],
    },
  },

  // ────────────────────────────────────────────
  // SKILLS MATRIX (categories aligned to SkillCategory enum in skills.ts)
  // ────────────────────────────────────────────
  skillsMatrix: [
    {
      category: 'Languages',
      items: [
        'Python',
        'TypeScript',
        'JavaScript',
        'C#',
        'SQL',
        'Bash',
        'Java',
      ],
    },
    {
      category: 'Frameworks',
      items: [
        'FastAPI',
        '.NET 10 / ASP.NET Core',
        'Angular 20',
        'Next.js',
        'React',
        'Node.js',
        'Express.js',
        'Flask',
        'Spring Boot',
        'Tailwind CSS',
      ],
    },
    {
      category: 'Data / AI',
      items: [
        'Large Language Models',
        'Prompt Engineering',
        'Model Evaluation',
        'Vertex AI (Gemini)',
        'PyTorch',
        'sentence-transformers',
        'OpenCV',
        'Pandas',
        'NumPy',
        'Scikit-learn',
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        'Docker',
        'nginx',
        'Linux',
        'AWS (EC2/S3/Lambda)',
        'GCP',
        'GitHub Actions',
        'CI/CD',
        'SonarCloud',
        'CodeQL',
      ],
    },
    {
      category: 'Databases',
      items: [
        'PostgreSQL',
        'SQL Server',
        'MongoDB',
        'Redis',
        'SQLite',
        'pgvector',
        'Entity Framework Core',
        'SQLAlchemy',
      ],
    },
    {
      category: 'Tooling',
      items: [
        'Git',
        'Jest',
        'Pytest',
        'xUnit',
        'Postman',
        'Swagger / OpenAPI',
        'Vercel',
        'Jira',
      ],
    },
  ],

  // ────────────────────────────────────────────
  // EXPERIENCE
  // ────────────────────────────────────────────
  experience: [
    {
      company: 'Healthcare Support, LLC',
      role: 'Software Developer',
      period: 'Mar 2026 → Present',
      bullets: [
        'Rebuilt a 7-year-old medical-evaluation scheduling platform on .NET 10, ABP Commercial, and Angular 20; deployed it to an on-premises Ubuntu server I provisioned. Shipped 846 commits, 390 PRs, and 17 architecture decision records.',
        'Migrated the platform from shared-database row filtering to one physical database per clinic office. Proved the isolation with a harness that disables the tenant filter and asserts cross-office records stay invisible.',
        'Built two transactional outboxes using SHA-256 idempotency keys and atomic database-lease claiming, plus reconciliation jobs that isolate errors per office, so concurrent workers never lose or double-send a notification.',
        'Ran a five-method bake-off for medical-record page-stream segmentation against ground truth I hand-labelled; the winning sliding-window method beat the rest on accuracy, recall, and cost, using 2 API calls versus 226.',
        'Proved document segmentation is a vision task, not a text task, by replicating a published OCR approach and watching recall drop from 0.92 to 0.66. Rejected four improvements on measured evidence.',
        'Root-caused a silent pipeline hang — no exception, so retry never fired — to an OpenMP/Tesseract deadlock. Proved it in isolation (0/60 tasks versus 60/60) and bounded all four thread pools.',
      ],
    },
    {
      company: 'One Community Global',
      role: 'Software Engineer (Volunteer)',
      period: 'Sept 2025 → Mar 2026',
      bullets: [
        'Built 15+ REST endpoints and MongoDB aggregation pipelines powering a building-management analytics dashboard in Node.js and Express, covering cost correlation, labor cost, issue breakdown, and tool utilization.',
        'Fixed 5 data-integrity bugs in volunteer statistics by rewriting aggregation pipelines, eliminating double-counting, misclassified hourly buckets, and stale summary counts across 1,000+ volunteer records.',
        'Built 12+ React/TypeScript components with Recharts and Chart.js, shipped WCAG AA-compliant dark mode across 20+ components, and wrote 500+ Jest unit and integration tests.',
      ],
    },
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
      title: 'Fundamentals of Deep Learning',
      provider: 'NVIDIA',
      year: '2021',
      month: 'Aug',
      filePath:
        '/certificates/Fundamentals Of Deep Learning DLI C-FX-01 Certificate _ Deep Learning Institute.pdf',
      description: 'Neural-network fundamentals & GPU acceleration',
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
      title: 'Microservices with Java Spring Boot and Spring Cloud',
      provider: 'Udemy',
      year: '2022',
      month: 'Nov',
      filePath:
        '/certificates/Microservices with Java Spring Boot  and Spring Cloud - udemy.pdf',
      description: 'Comprehensive microservices architecture with Spring',
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
      title: 'CCNAv7: Introduction to Networks',
      provider: 'Cisco',
      year: '2021',
      month: 'May',
      filePath: '/certificates/AdityaGambhir-CCNA v7 module 1-certificate.pdf',
      description: 'Networking fundamentals & Cisco technologies',
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
      title: 'Solidity Smart Contract Programming for Ethereum Blockchain',
      provider: 'Infosys',
      year: '2022',
      month: 'Apr',
      filePath:
        '/certificates/Solidity Smart Contract Programming for Ethereum Blockchain.pdf',
      description: 'Blockchain development & smart-contract programming',
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
        'Multiple Object Tracking (MOT) is crucial in computer vision and surveillance, especially for automating traffic control in challenging traffic environments. This review surveys advancements in object detection, tracking algorithms, lane departure warnings, and semantic segmentation, with a specific focus on traffic law enforcement. It covers issues like wrong-way, clearway, and one-way traffic violations, as well as challenges including occlusion and splits. Various methods, such as background subtraction and deep learning, are explored. The review stresses the significance of analyzing recent literature for researchers to bridge gaps, overcome limitations, and create new algorithms. It also touches on hardware, datasets, metrics, and research directions.',
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
      'Led workshops on deep learning for 80+ students, fostering the next generation of AI practitioners.',
  },

  personalTouch: {
    favoriteStack: 'FastAPI + Next.js + Postgres',
    hobbies: ['☕ Perfect-cup coffee geek', '🎸 Guitarist in spare time'],
  },

  // ────────────────────────────────────────────
  // LOCATION
  // ────────────────────────────────────────────
  location: 'Los Angeles, CA',
};
