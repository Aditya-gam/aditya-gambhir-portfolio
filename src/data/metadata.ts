// Site configuration and metadata
export const SITE_CONFIG = {
  name: 'Aditya Gambhir',
  domain: 'aditya-gambhir-portfolio.vercel.app',
  url: 'https://aditya-gambhir-portfolio.vercel.app',
  email: 'gambhir.aditya19@gmail.com',
  author: {
    name: 'Aditya Gambhir',
    email: 'gambhir.aditya19@gmail.com',
    twitter: '@adityagambhir',
    linkedin: 'https://www.linkedin.com/in/aditya-gambhir',
    github: 'https://github.com/Aditya-gam',
    location: 'Los Angeles, CA',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
} as const;

// SEO Metadata (without as const to allow mutable arrays for Next.js)
export const SEO_METADATA = {
  title: {
    default: 'Aditya Gambhir | Software Engineer & Data Scientist',
    template: '%s | Aditya Gambhir',
  },
  description:
    'Software Engineer and Data Scientist with 1.5+ years experience in full-stack development and machine learning. M.S. Computational Data Science from UC Riverside.',
  keywords: [
    'Aditya Gambhir',
    'Software Engineer',
    'Data Scientist',
    'MERN Stack',
    'Python',
    'Machine Learning',
    'Full Stack Developer',
    'Portfolio',
    'React',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'AWS',
    'Data Science',
    'AI/ML Engineer',
  ],
  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
    siteName: 'Aditya Gambhir Portfolio',
    title: 'Aditya Gambhir | Software Engineer & Data Scientist',
    description:
      'Software Engineer and Data Scientist with 1.5+ years experience in full-stack development and machine learning.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir - Software Engineer & Data Scientist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Aditya Gambhir | Software Engineer & Data Scientist',
    description:
      'Software Engineer and Data Scientist with 1.5+ years experience in MERN stack and Python.',
    images: ['/og-default.png'],
    creator: '@adityagambhir',
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
    jobTitle: 'Software Engineer & Data Scientist',
    headline: 'Software Engineer & Data Scientist',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/headshot.webp`,
    email: SITE_CONFIG.author.email,
    sameAs: [SITE_CONFIG.author.linkedin, SITE_CONFIG.author.github],
    knowsAbout: [
      'Software Engineering',
      'Data Science',
      'Machine Learning',
      'MERN Stack',
      'Python',
      'JavaScript',
      'React',
      'Node.js',
      'AWS',
      'TypeScript',
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

// Robots.txt configuration (without as const to allow mutable arrays for Next.js)
export const ROBOTS_CONFIG = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/', '/_next/', '/admin/', '/.well-known/appspecific/'],
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
      path: '/about',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      path: '/projects',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      path: '/resume',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      path: '/contact',
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ],
} as const;

// HTML Meta Tags
export const HTML_META = {
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0A66C2',
  colorScheme: 'light dark',
  canonical: SITE_CONFIG.url,
} as const;
