import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Aditya Gambhir',
  description:
    'Get in touch with Aditya Gambhir. Send a message about opportunities, collaborations, or questions.',
  keywords: ['contact', 'Aditya Gambhir', 'portfolio', 'hire', 'collaboration'],
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
