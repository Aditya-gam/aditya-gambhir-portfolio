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
    /** Graduation month, e.g. "Mar 2025" */
    graduated?: string;
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
    title: 'Software Engineer • Backend & Distributed Systems • Generative AI',
    description:
      'Software engineer with 3+ years building production-grade microservices and event-driven backend systems, bridging generative AI with distributed architecture to deliver secure, reliable software.',
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
    experience: '3+',
    projects: '10+',
    gpa: '3.67',
    publications: '1',
  },

  // ────────────────────────────────────────────
  // PROFESSIONAL SUMMARY (from the Oct 2026 CV)
  // ────────────────────────────────────────────
  professionalSummary: {
    description:
      'Software Engineer with 3+ years building production-grade microservices and event-driven backend systems processing enterprise-scale transaction volumes. Reduced release cycles from weeks to days through disciplined CI/CD, rigorous test-driven engineering, and 85% code coverage standards. Committed to bridging generative AI capabilities with distributed architecture to deliver secure, reliable, and high-performance systems.',
    quote:
      'Knowing which parts of a number are recoverable matters more than the number.',
  },

  // ────────────────────────────────────────────
  // DUAL EXPERTISE (key `dataScientist` kept for compatibility)
  // ────────────────────────────────────────────
  dualExpertise: {
    dataScientist: {
      title: 'AI / LLM Engineer',
      achievements: [
        'Built an AI-powered member-support chatbot with Spring Boot, Azure AI, and LLM-based knowledge search, cutting agent response time by 22% and documentation search time by 35%',
        'Ran a five-method bake-off for medical-record segmentation against hand-labeled ground truth; sliding-window won on Document-F1, recall, and cost',
        'Architected a multi-agent literature-review system with Microsoft AutoGen and an LLM provider layer that falls back across Together AI, Gemini, Perplexity, and OpenAI',
      ],
      technologies: [
        'LangChain',
        'LangGraph',
        'RAG',
        'Azure OpenAI',
        'AutoGen',
        'Python',
        'FastAPI',
      ],
    },
    softwareEngineer: {
      title: 'Software Engineer (Backend & Distributed Systems)',
      achievements: [
        'Engineered a Kafka-based event streaming pipeline syncing member eligibility and claims data in real time, processing over 100,000 events daily with zero data loss',
        'Migrated a multi-tenant clinical platform to one physical database per clinic office, validating isolation with a harness that disables tenant filtering',
        'Cut payment processing time by 40% for a system handling over 500,000 daily transactions by rewriting joins and adding indexes',
        'Built deployment pipelines with Docker, Jenkins, and Kubernetes, cutting release time from 2 weeks to 3 days',
      ],
      technologies: [
        'Java',
        'Spring Boot',
        'Kafka',
        'PostgreSQL',
        'Docker',
        'Kubernetes',
        'AWS',
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
        'Java',
        'TypeScript',
        'JavaScript',
        'C#',
        'SQL',
        'Bash',
      ],
    },
    {
      category: 'Frameworks',
      items: [
        'Spring Boot',
        'Spring MVC',
        'Spring Security',
        'Hibernate',
        '.NET',
        'FastAPI',
        'Node.js',
        'Express.js',
        'React',
        'Angular',
        'Redux',
        'HTML5',
        'CSS3',
        'Bootstrap',
        'jQuery',
      ],
    },
    {
      category: 'Data / AI',
      items: [
        'LangChain',
        'LangGraph',
        'RAG',
        'Prompt Engineering',
        'OpenAI API',
        'Azure OpenAI',
        'AWS Bedrock',
        'Embeddings',
        'Pinecone',
        'Chroma',
        'Hugging Face',
        'CrewAI',
        'AutoGen',
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        'AWS (EC2, S3, Lambda, RDS)',
        'Azure',
        'Docker',
        'Kubernetes',
        'Terraform',
        'CI/CD',
        'Jenkins',
        'GitHub Actions',
      ],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Kafka'],
    },
    {
      category: 'Tooling',
      items: [
        'RESTful APIs',
        'GraphQL',
        'Swagger',
        'API Design',
        'JUnit',
        'Mockito',
        'Jest',
        'Cypress',
        'Maven',
        'Git',
        'GitHub',
        'Microservices Architecture',
        'Agile (Scrum)',
        'SDLC',
        'Waterfall',
      ],
    },
  ],

  // ────────────────────────────────────────────
  // EXPERIENCE (mirrors the Oct 2026 CV)
  // ────────────────────────────────────────────
  experience: [
    {
      company: 'Healthcare Support, LLC',
      role: 'Software Engineer',
      period: 'Mar 2026 → Sep 2026',
      bullets: [
        'Rebuilt a 7-year-old medical scheduling platform on .NET 10, ABP Commercial, and Angular 20, deploying to a self-hosted Ubuntu server, producing 846 commits, 390 pull requests, and 17 ADRs total.',
        'Migrated the platform from shared-database row filtering to one physical database per clinic office, validating isolation with a test harness that disables tenant filtering and confirms cross-office records stay invisible.',
        'Built two transactional outboxes using SHA-256 idempotency keys and atomic database-lease claiming, plus reconciliation jobs with per-office error isolation, ensuring notifications are never lost or duplicated under concurrent worker processes.',
        'Ran a five-method bake-off for medical-record segmentation against hand-labeled ground truth; sliding-window won on Document-F1, recall, and cost, rejecting four alternative methods including text-based OCR consistently using fewer API calls.',
      ],
    },
    {
      company: 'Centene',
      role: 'Software Engineer',
      period: 'Jan 2025 → Mar 2026',
      bullets: [
        'Built an AI-powered chatbot using Spring Boot, Azure AI, and LLM-based knowledge search to automate member support inquiries, cutting agent response time by 22% and documentation search time by 35%.',
        'Developed REST APIs with OAuth2 authentication for internal and external member-facing systems, maintaining strict HIPAA compliance and 99.9% uptime across critical production healthcare environments and backend services daily.',
        'Engineered a Kafka-based event streaming pipeline syncing member eligibility and claims data in real time across multiple internal healthcare systems, processing over 100,000 events daily with zero data loss.',
        'Wrote unit and integration tests using JUnit and Mockito for backend services, maintaining approximately 85% code coverage and catching defects before they reached the production release pipeline each week.',
        'Collaborated in Agile Scrum teams with Product, QA, and DevOps engineers, delivering new features in two-week sprints while conducting peer code reviews to maintain team engineering standards throughout each release.',
      ],
    },
    {
      company: 'CRED',
      role: 'Software Engineer',
      period: 'Jan 2022 → Aug 2023',
      bullets: [
        'Developed 15+ REST APIs using Java and Spring Boot, writing automated JUnit tests to catch bugs early and reduce production issues before code changes reached the live payment processing system.',
        'Optimized slow-running SQL queries by rewriting joins and adding database indexes across services, cutting payment processing time by 40% for a system handling over 500,000 financial transactions each day.',
        'Configured AWS auto-scaling and access controls for backend services supporting real-time transaction processing, improving system uptime to 99.5% while reducing overall monthly cloud hosting infrastructure costs by 25%.',
        'Refactored key ReactJS components by introducing Redux state management and removing unnecessary repeated API calls, cutting page load time for 50,000 monthly active users on the app.',
        'Built 2 deployable microservices with automated unit tests in Mockito and created automated deployment pipelines using Docker, Jenkins, and Kubernetes, cutting release time from 2 weeks to 3 days.',
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
      graduated: 'Mar 2025',
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
      graduated: 'May 2023',
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
    favoriteStack: 'Spring Boot + FastAPI + Next.js + Postgres',
    hobbies: ['☕ Perfect-cup coffee geek', '🎸 Guitarist in spare time'],
  },

  // ────────────────────────────────────────────
  // LOCATION
  // ────────────────────────────────────────────
  location: 'Los Angeles, CA',
};
