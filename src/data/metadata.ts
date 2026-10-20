// Site configuration and metadata
export const SITE_CONFIG = {
  name: 'Aditya Gambhir',
  domain: 'aditya-gambhir-portfolio.vercel.app',
  url: 'https://aditya-gambhir-portfolio.vercel.app',
  email: 'gambhir.aditya19@gmail.com',
  author: {
    name: 'Aditya Gambhir',
    email: 'gambhir.aditya19@gmail.com',
    twitter: '@CasualIdiot21',
    linkedin: 'https://www.linkedin.com/in/aditya-gambhir',
    github: 'https://github.com/Aditya-gam',
    location: 'Los Angeles, CA',
  },
  verification: {
    google: 'llEa_cvIojPazFPkcKIPQRVs06TYY19mCcA7tx96cJc',
  },
} as const;

// SEO Metadata (without as const to allow mutable arrays for Next.js)
export const SEO_METADATA = {
  title: {
    default: 'Aditya Gambhir | Software Engineer · Backend & Generative AI',
    template: '%s | Aditya Gambhir',
  },
  description:
    'Software engineer with 3+ years building microservices, event-driven backends, and generative-AI systems. M.S. Computational Data Science, UC Riverside.',
  keywords: [
    'Aditya Gambhir',
    'Software Engineer',
    'Backend Engineer',
    'Microservices',
    'Distributed Systems',
    'Event-Driven Architecture',
    'Java',
    'Spring Boot',
    'Kafka',
    'Python',
    'FastAPI',
    'TypeScript',
    'React',
    'Angular',
    'Node.js',
    'C#',
    '.NET',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'CI/CD',
    'Generative AI',
    'LangChain',
    'LangGraph',
    'RAG',
    'Azure OpenAI',
    'AutoGen',
    'Full Stack Developer',
    'Portfolio',
  ],
  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
    siteName: 'Aditya Gambhir Portfolio',
    title: 'Aditya Gambhir | Software Engineer · Backend & Generative AI',
    description:
      'Software engineer with 3+ years building microservices, event-driven backends, and generative-AI systems.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir — Software Engineer · Backend & Generative AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Aditya Gambhir | Software Engineer · Backend & Generative AI',
    description:
      'Software engineer with 3+ years building microservices, event-driven backends, and generative-AI systems.',
    images: ['/og-default.png'],
    creator: '@CasualIdiot21',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
};

// Structured Data (JSON-LD)
export const STRUCTURED_DATA = {
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
    jobTitle: 'Software Engineer',
    headline: 'Software Engineer • Backend & Generative AI',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/headshot1.webp`,
    email: SITE_CONFIG.author.email,
    sameAs: [SITE_CONFIG.author.linkedin, SITE_CONFIG.author.github],
    knowsAbout: [
      'Software Engineering',
      'Microservices',
      'Distributed Systems',
      'Event-Driven Architecture',
      'Java',
      'Spring Boot',
      'Kafka',
      'Python',
      'FastAPI',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'Generative AI',
      'Retrieval-Augmented Generation',
      'LangChain',
      'LangGraph',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'University of California, Riverside',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
} as const;

// Robots.txt configuration
export const ROBOTS_CONFIG = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/', '/admin/', '/.well-known/appspecific/'],
  },
  sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  host: SITE_CONFIG.url,
};

// Sitemap configuration
export const SITEMAP_CONFIG = {
  baseUrl: SITE_CONFIG.url,
  pages: [
    {
      path: '',
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      path: '/projects',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ],
} as const;

// HTML Meta Tags (theme-color handled by the viewport export in layout.tsx)
export const HTML_META = {
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7c3aed',
  colorScheme: 'light dark',
  canonical: SITE_CONFIG.url,
} as const;
