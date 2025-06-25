import { ProjectData } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Featured projects (homepage carousel / hero section)
// ─────────────────────────────────────────────────────────────────────────────

export const featuredProjects: ProjectData[] = [
  {
    title: 'Navigate LA28: Real-Time Geospatial Navigation',
    description:
      'Big-data geospatial platform delivering dynamic routing and urban-planning analytics for the LA 2028 Olympics.',
    bullets: ['Spark + PostGIS', 'Leaflet.js maps', 'Docker microservices'],
    imageSrc: '/projects/navigate-la28.svg',
    imageAlt: 'Navigate LA28 interactive map UI',
    priority: true,
    technologies: [
      'React',
      'Leaflet.js',
      'FastAPI',
      'Apache Spark',
      'PostGIS',
      'Docker',
      'GDAL',
      'GeoPandas',
    ],
    githubUrl: 'https://github.com/Aditya-gam/Navigate-LA-28',
  },
  {
    title: 'Dockership: Optimized Freight Ship Management System',
    description:
      'Containerized application that automates container loading, unloading, and weight-balancing for freight ships.',
    bullets: [
      'Dockerized deployment',
      'Real-time 2D visualization',
      'MongoDB Atlas',
    ],
    imageSrc: '/projects/dockership.svg',
    imageAlt: 'Dockership freight-ship management UI',
    priority: true,
    technologies: ['Python', 'Streamlit', 'Docker', 'MongoDB Atlas', 'Pytest'],
    githubUrl: 'https://github.com/Aditya-gam/Dockership',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// All projects (projects page)
// ─────────────────────────────────────────────────────────────────────────────

export const allProjects: ProjectData[] = [
  ...featuredProjects,

  // ---------------------------------------------------------------------------
  // Additional portfolio projects
  // ---------------------------------------------------------------------------
  {
    title: 'Sensor Fusion for Self-Driving Vehicles',
    description:
      'Highway-traffic simulator fusing LiDAR, RADAR, and camera data via Unscented Kalman Filter for vehicle tracking.',
    bullets: ['LiDAR & RADAR parsing', 'UKF tracking', 'RMSE evaluation'],
    imageSrc: '/projects/sensor-fusion.svg',
    imageAlt: 'Sensor fusion visualization',
    priority: false,
    technologies: ['C++', 'Python', 'OpenCV', 'PCL', 'NumPy', 'Matplotlib'],
    githubUrl: 'https://github.com/Aditya-gam/SelfDriving-SensorFusion',
  },
  {
    title: 'Transformer Models for Crowd Localisation',
    description:
      'End-to-end transformer model predicting head positions in dense crowds with KMO-Hungarian matching.',
    bullets: ['Transformer backbone', 'EBC framework', 'MAE/MAE metrics'],
    imageSrc: '/projects/crowd-transformer.svg',
    imageAlt: 'Crowd localisation heat-map',
    priority: false,
    technologies: ['PyTorch', 'Transformers', 'CLIP', 'Python'],
    githubUrl:
      'https://github.com/Aditya-gam/Transformer-Model-for-Crowd-Localization',
  },
  {
    title: 'Image Deblurring Using Autoencoders',
    description:
      'U-Net-based convolutional autoencoder achieving state-of-the-art PSNR/SSIM across multiple datasets.',
    bullets: ['U-Net architecture', 'CelebA & GoPro', 'Adam optimizer'],
    imageSrc: '/projects/image-deblurring.svg',
    imageAlt: 'Image deblurring before-after',
    priority: false,
    technologies: ['TensorFlow', 'Keras', 'Python', 'OpenCV', 'NumPy'],
    githubUrl: 'https://github.com/Aditya-gam/Deblurring-Autoencoders',
  },
  {
    title: 'Chatbot Using Transformer Models',
    description:
      'Comparative study of LSTM vs. Transformer chatbots on the Cornell Movie Corpus, with performance evaluation.',
    bullets: [
      'Transformer encoder-decoder',
      'Performance analysis',
      'Cornell corpus',
    ],
    imageSrc: '/projects/chatbot-transformer.svg',
    imageAlt: 'Chatbot conversation interface',
    priority: false,
    technologies: ['PyTorch', 'Transformers', 'Python'],
    githubUrl: 'https://github.com/Aditya-gam/DNLP-Chatbot',
  },
  {
    title: 'Tech Mock API',
    description:
      'MERN-stack mock-server platform allowing users to spin up custom API endpoints for testing workflows.',
    bullets: ['MERN stack', 'Dynamic endpoint generation', 'Developer tooling'],
    imageSrc: '/projects/tech-mock-api.svg',
    imageAlt: 'Tech Mock API dashboard',
    priority: false,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/Aditya-gam/Tech-Mock-API',
  },
  {
    title: 'Admin Dashboard',
    description:
      'Enterprise MERN dashboard with JWT-based auth, RBAC, and real-time KPI visualisations.',
    bullets: ['Role-based access', 'Dynamic charts', 'Modular design'],
    imageSrc: '/projects/admin-dashboard.svg',
    imageAlt: 'Admin dashboard KPI charts',
    priority: false,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Redux'],
    githubUrl: 'https://github.com/Aditya-gam/Tech-Mock-API',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────────────────────────────────────

export const getProjectsByTechnology = (tech: string): ProjectData[] =>
  allProjects.filter((project) =>
    project.technologies?.some((t) =>
      t.toLowerCase().includes(tech.toLowerCase()),
    ),
  );

export const getFeaturedProjects = (): ProjectData[] => featuredProjects;

export const getAllProjects = (): ProjectData[] => allProjects;
