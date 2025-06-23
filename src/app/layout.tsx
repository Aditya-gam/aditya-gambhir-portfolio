import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { ClientLayout } from '@/app/ClientLayout';

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
      'Software Engineer and Data Scientist with expertise in MERN stack and Python.',
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
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
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
    <>
      {/* Ensure DOCTYPE html is set (Next.js should handle this, but being explicit) */}
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ClientLayout>
            <main id="main-content" className="flex-grow">
              {children}
            </main>
          </ClientLayout>
          <Footer />
        </body>
      </html>
    </>
  );
}
