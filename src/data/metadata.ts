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
    default: 'Aditya Gambhir | Software Engineer & Applied AI',
    template: '%s | Aditya Gambhir',
  },
  description:
    'Software engineer with 2.5+ years building and measuring LLM systems and multi-tenant platforms in regulated healthcare. M.S. Computational Data Science, UC Riverside.',
  keywords: [
    'Aditya Gambhir',
    'Software Engineer',
    'Software Developer',
    'Applied AI',
    'Large Language Models',
    'LLM Evaluation',
    'Vertex AI',
    'Gemini',
    'Multi-Tenant Architecture',
    'Distributed Systems',
    'C#',
    '.NET',
    'ASP.NET Core',
    'Angular',
    'FastAPI',
    'Next.js',
    'React',
    'Node.js',
    'TypeScript',
    'Python',
    'PostgreSQL',
    'SQL Server',
    'Redis',
    'Docker',
    'WebRTC',
    'HIPAA',
    'Healthcare Software',
    'CI/CD',
    'Full Stack Developer',
    'Machine Learning',
    'Portfolio',
  ],
  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
    siteName: 'Aditya Gambhir Portfolio',
    title: 'Aditya Gambhir | Software Engineer & Applied AI',
    description:
      'Software engineer with 2.5+ years building and measuring LLM systems and multi-tenant platforms in regulated healthcare.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir — Software Engineer & Applied AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Aditya Gambhir | Software Engineer & Applied AI',
    description:
      'Software engineer with 2.5+ years building and measuring LLM systems and multi-tenant platforms in regulated healthcare.',
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
    jobTitle: 'Software Developer',
    headline: 'Software Engineer • Applied AI & LLM Systems',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/headshot1.webp`,
    email: SITE_CONFIG.author.email,
    sameAs: [SITE_CONFIG.author.linkedin, SITE_CONFIG.author.github],
    worksFor: {
      '@type': 'Organization',
      name: 'Healthcare Support, LLC',
    },
    knowsAbout: [
      'Software Engineering',
      'Applied AI',
      'Large Language Models',
      'LLM Evaluation',
      'Multi-Tenant Architecture',
      'Distributed Systems',
      '.NET',
      'Angular',
      'Next.js',
      'FastAPI',
      'Python',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'HIPAA',
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
