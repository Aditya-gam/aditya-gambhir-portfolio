import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Lazy load Footer since it's below the fold (SSR enabled for SEO)
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-24" />, // Prevent layout shift
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aditya-gambhir-portfolio.vercel.app/'),
  title: {
    default: 'Aditya Gambhir | Software Engineer & Data Scientist',
    template: '%s | Aditya Gambhir',
  },
  description:
    'Software Engineer and Data Scientist with 5+ years of experience in full-stack development and machine learning. Specializing in MERN stack and Python-based data solutions.',
  keywords: [
    'Aditya Gambhir',
    'Software Engineer',
    'Data Scientist',
    'MERN Stack',
    'Python',
    'Machine Learning',
    'Full Stack Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Aditya Gambhir' }],
  creator: 'Aditya Gambhir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aditya-gambhir-portfolio.vercel.app/',
    siteName: 'Aditya Gambhir Portfolio',
    title: 'Aditya Gambhir | Software Engineer & Data Scientist',
    description:
      'Software Engineer and Data Scientist with 5+ years of experience in full-stack development and machine learning.',
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
    card: 'summary_large_image',
    title: 'Aditya Gambhir | Software Engineer & Data Scientist',
    description:
      'Software Engineer and Data Scientist with 5+ years of experience in full-stack development and machine learning.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-google-verification-code',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aditya Gambhir',
  jobTitle: 'Software Engineer & Data Scientist',
  headline: 'Software Engineer & Data Scientist',
  url: 'https://aditya-gambhir-portfolio.vercel.app/',
  image: 'https://aditya-gambhir-portfolio.vercel.app/headshot.webp',
  sameAs: [
    'https://www.linkedin.com/in/aditya-gambhir',
    'https://github.com/Aditya-gam',
  ],
  knowsAbout: [
    'Software Engineering',
    'Data Science',
    'Machine Learning',
    'MERN Stack',
    'Python',
    'JavaScript',
    'React',
    'Node.js',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'Your University', // Update with actual university
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="canonical"
          href="https://aditya-gambhir-portfolio.vercel.app/"
        />
        <meta name="theme-color" content="#0A66C2" />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans flex flex-col min-h-screen bg-background text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[1000] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded focus:no-underline focus-ring"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
