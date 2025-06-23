import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Aditya Gambhir for software engineering opportunities, data science collaborations, or technical discussions. Always open to new challenges and partnerships.',
  keywords: [
    'contact',
    'Aditya Gambhir',
    'hire software engineer',
    'data scientist contact',
    'collaboration',
    'opportunities',
  ],
  openGraph: {
    title: 'Contact | Aditya Gambhir',
    description:
      'Get in touch with Aditya Gambhir for software engineering opportunities, data science collaborations, or technical discussions.',
    url: 'https://aditya-gambhir-portfolio.vercel.app/contact',
    siteName: 'Aditya Gambhir Portfolio',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Contact Aditya Gambhir',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Aditya Gambhir',
    description:
      'Get in touch for software engineering and data science opportunities.',
    images: ['/og-default.png'],
  },
};

export default function ContactPage() {
  return (
    <div className="page-layout-narrow">
      <div className="page-header">
        <h1 className="heading-page">Contact Me</h1>
        <p className="page-description text-muted">
          I&apos;m always interested in hearing about new opportunities,
          collaborations, or just having a chat about technology and innovation.
        </p>
      </div>

      <div className="contact-container">
        <ContactForm />
      </div>
    </div>
  );
}
