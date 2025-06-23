import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aditya-gambhir-portfolio.vercel.app/'),
  title: 'Aditya Gambhir | Software Engineer & Data Scientist',
  description:
    'Personal portfolio showcasing projects and resume of Aditya Gambhir.',
  openGraph: {
    title: 'Aditya Gambhir | Portfolio',
    description: 'Software Engineer & Data Scientist portfolio website.',
    url: 'https://aditya-gambhir-portfolio.vercel.app/',
    images: ['/og-default.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Gambhir | Portfolio',
    description: 'Software Engineer & Data Scientist portfolio website.',
    images: ['/og-default.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aditya Gambhir',
  jobTitle: 'Software Engineer & Data Scientist',
  url: 'https://aditya-gambhir-portfolio.vercel.app/',
  sameAs: [
    'https://www.linkedin.com/in/aditya-gambhir',
    'hhttps://github.com/Aditya-gam',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:underline"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
