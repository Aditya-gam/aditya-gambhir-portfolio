import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import dynamic from 'next/dynamic';
import { ClientLayout } from '@/app/ClientLayout';
import {
  SEO_METADATA,
  STRUCTURED_DATA,
  HTML_META,
  SITE_CONFIG,
} from '@/data/metadata';
import { NAVIGATION_CONTENT } from '@/data/content';

// Lazy load Footer since it's below the fold (SSR enabled for SEO)
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-24" />, // Prevent layout shift
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SEO_METADATA.title,
  description: SEO_METADATA.description,
  keywords: SEO_METADATA.keywords,
  authors: [{ name: SITE_CONFIG.author.name }],
  creator: SITE_CONFIG.author.name,
  openGraph: {
    ...SEO_METADATA.openGraph,
    url: SITE_CONFIG.url,
  },
  twitter: SEO_METADATA.twitter,
  robots: SEO_METADATA.robots,
  verification: SITE_CONFIG.verification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Ensure DOCTYPE html is set (Next.js should handle this, but being explicit) */}
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet={HTML_META.charset} />
          <meta name="viewport" content={HTML_META.viewport} />
          <link rel="canonical" href={HTML_META.canonical} />
          <meta name="theme-color" content={HTML_META.themeColor} />
          <meta name="color-scheme" content={HTML_META.colorScheme} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(STRUCTURED_DATA.person),
            }}
          />
        </head>
        <body
          className="font-sans flex flex-col min-h-screen bg-background text-foreground antialiased"
          suppressHydrationWarning={true}
        >
          <a href={`#${NAVIGATION_CONTENT.mainContent}`} className="skip-link">
            {NAVIGATION_CONTENT.skipToMain}
          </a>
          <ClientLayout>
            <main id={NAVIGATION_CONTENT.mainContent} className="flex-grow">
              {children}
            </main>
            <Footer />
          </ClientLayout>
        </body>
      </html>
    </>
  );
}
