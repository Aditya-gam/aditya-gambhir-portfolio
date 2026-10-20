import { ProjectData } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Featured projects (homepage — larger cards)
// `hue` drives the card's gradient header; `tag` is the mono "// tag" label.
// ─────────────────────────────────────────────────────────────────────────────

export const featuredProjects: ProjectData[] = [
  {
    title: 'Navigate LA28',
    description:
      'Full-stack geospatial navigation platform with real-time interactive mapping, multi-modal route planning, and live transit tracking for Olympic venue navigation, backed by a Spark/Hadoop pipeline processing 1M+ records a minute. Built with a 4-person team.',
    bullets: [
      'React 18 + Redux, FastAPI, PostGIS',
      'Spark + Hadoop/HDFS, 1M+ records/min',
      'JWT, CORS, Bandit/Safety hardening',
    ],
    imageSrc: '/projects/navigate-la28.svg',
    imageAlt: 'Navigate LA28 interactive map UI',
    priority: true,
    featured: true,
    hue: 286,
    tag: 'geospatial',
    technologies: [
      'React',
      'Redux',
      'FastAPI',
      'PostgreSQL / PostGIS',
      'Apache Spark',
      'Hadoop',
      'Docker',
      'Nginx',
    ],
    githubUrl: 'https://github.com/Aditya-gam/Navigate-LA-28',
  },
  {
    title: 'Survey Studio — AI Literature Review',
    description:
      'Multi-agent literature-review system: AutoGen search and summarizer agents automate arXiv retrieval, analysis, and structured review generation, behind an LLM provider layer with fallback across Together AI, Gemini, Perplexity, and OpenAI.',
    bullets: [
      'Microsoft AutoGen multi-agent',
      'LLM provider fallback + cost control',
      'Poetry, Ruff, Pyright, CI',
    ],
    imageSrc: '/projects/survey-studio.svg',
    imageAlt: 'Survey Studio literature-review interface',
    priority: true,
    featured: true,
    hue: 190,
    tag: 'multi-agent',
    technologies: [
      'Python',
      'AutoGen',
      'FastAPI',
      'Pydantic',
      'OpenAI',
      'Gemini',
      'Poetry',
    ],
    githubUrl: 'https://github.com/Aditya-gam/survey-studio',
  },
  {
    title: 'Glasshouse — LLM Privacy Self-Audit',
    description:
      'A privacy tool that shows you what an LLM can infer about you from your own posts — then helps you break the inference. In active development.',
    bullets: [
      'Self-consistency ensemble',
      'Per-user envelope encryption',
      'RLS isolation proven by CI gate',
    ],
    imageSrc: '/projects/glasshouse.svg',
    imageAlt: 'Glasshouse privacy self-audit interface',
    priority: true,
    featured: true,
    hue: 266,
    tag: 'privacy-ai',
    technologies: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'LiteLLM',
      'Next.js',
      'TypeScript',
    ],
    githubUrl: 'https://github.com/Aditya-gam/glasshouse',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Additional projects (smaller cards)
// ─────────────────────────────────────────────────────────────────────────────

export const moreProjects: ProjectData[] = [
  {
    title: 'Dockership',
    description:
      'Containerized freight-ship platform automating container loading, unloading and weight-balancing.',
    bullets: [
      'Dockerized deployment',
      'Real-time 2D visualization',
      'MongoDB Atlas',
    ],
    imageSrc: '/projects/dockership.svg',
    imageAlt: 'Dockership freight-ship management UI',
    featured: false,
    hue: 330,
    tag: 'logistics',
    technologies: ['Python', 'Streamlit', 'Docker', 'MongoDB Atlas', 'Pytest'],
    githubUrl: 'https://github.com/Aditya-gam/Dockership',
  },
  {
    title: 'Sensor Fusion for Self-Driving',
    description:
      'Fuses LiDAR, RADAR and camera via an Unscented Kalman Filter for highway vehicle tracking.',
    bullets: ['LiDAR & RADAR parsing', 'UKF tracking', 'RMSE evaluation'],
    imageSrc: '/projects/sensor-fusion.svg',
    imageAlt: 'Sensor fusion visualization',
    featured: false,
    hue: 235,
    tag: 'sensor-fusion',
    technologies: ['C++', 'PCL', 'OpenCV', 'UKF'],
    githubUrl: 'https://github.com/Aditya-gam/SelfDriving-SensorFusion',
  },
  {
    title: 'Transformer Crowd Localization',
    description:
      'End-to-end transformer predicting head positions in dense crowds with Hungarian matching.',
    bullets: ['Transformer backbone', 'EBC framework', 'MAE metrics'],
    imageSrc: '/projects/crowd-transformer.svg',
    imageAlt: 'Crowd localisation heat-map',
    featured: false,
    hue: 200,
    tag: 'vision',
    technologies: ['PyTorch', 'Transformers', 'CLIP'],
    githubUrl:
      'https://github.com/Aditya-gam/Transformer-Model-for-Crowd-Localization',
  },
  {
    title: 'Image Deblurring Autoencoders',
    description:
      'U-Net convolutional autoencoder hitting state-of-the-art PSNR/SSIM across datasets.',
    bullets: ['U-Net architecture', 'CelebA & GoPro', 'Adam optimizer'],
    imageSrc: '/projects/image-deblurring.svg',
    imageAlt: 'Image deblurring before-after',
    featured: false,
    hue: 162,
    tag: 'vision',
    technologies: ['TensorFlow', 'Keras', 'OpenCV'],
    githubUrl: 'https://github.com/Aditya-gam/Deblurring-Autoencoders',
  },
  {
    title: 'Transformer vs LSTM Chatbot',
    description:
      'Comparative seq2seq chatbot study on the Cornell Movie Corpus with BLEU evaluation.',
    bullets: [
      'Transformer encoder-decoder',
      'Performance analysis',
      'Cornell corpus',
    ],
    imageSrc: '/projects/chatbot-transformer.svg',
    imageAlt: 'Chatbot conversation interface',
    featured: false,
    hue: 266,
    tag: 'nlp',
    technologies: ['PyTorch', 'Transformers', 'Python'],
    githubUrl: 'https://github.com/Aditya-gam/DNLP-Chatbot',
  },
  {
    title: 'Tech Mock API',
    description:
      'MERN platform letting developers spin up custom mock REST endpoints for testing.',
    bullets: ['MERN stack', 'Dynamic endpoint generation', 'Developer tooling'],
    imageSrc: '/projects/tech-mock-api.svg',
    imageAlt: 'Tech Mock API dashboard',
    featured: false,
    hue: 250,
    tag: 'platform',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/Aditya-gam/Tech-Mock-API',
  },
  {
    title: 'Admin Dashboard',
    description:
      'Enterprise MERN dashboard with JWT auth, role-based access and real-time KPI charts.',
    bullets: ['Role-based access', 'Dynamic charts', 'Modular design'],
    imageSrc: '/projects/admin-dashboard.svg',
    imageAlt: 'Admin dashboard KPI charts',
    featured: false,
    hue: 24,
    tag: 'dashboard',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    // githubUrl intentionally omitted — previously duplicated Tech Mock API's
    // repo. Provide the correct Admin Dashboard repo URL to restore the link.
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Combined + helpers
// ─────────────────────────────────────────────────────────────────────────────

export const allProjects: ProjectData[] = [
  ...featuredProjects,
  ...moreProjects,
];

export const getProjectsByTechnology = (tech: string): ProjectData[] =>
  allProjects.filter((project) =>
    project.technologies?.some((t) =>
      t.toLowerCase().includes(tech.toLowerCase()),
    ),
  );

export const getFeaturedProjects = (): ProjectData[] =>
  allProjects.filter((project) => project.featured === true);

export const getMoreProjects = (): ProjectData[] => moreProjects;

export const getAllProjects = (): ProjectData[] => allProjects;
