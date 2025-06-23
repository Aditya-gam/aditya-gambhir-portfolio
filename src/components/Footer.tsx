'use client';

import { Mail } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { useContext } from 'react';
import { ContactModalContext } from '@/app/ContactModalContext';

// Create custom icon components for Simple Icons
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={siGithub.path} />
  </svg>
);

// LinkedIn icon from simple SVG path (since not available in simple-icons)
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const { openContactModal } = useContext(ContactModalContext);

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="footer-content">
        <div className="footer-copyright">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Aditya Gambhir. All rights reserved.
          </p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/aditya-gambhir"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aditya on GitHub"
            className="social-link"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/aditya-gambhir"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aditya on LinkedIn"
            className="social-link hover:text-primary"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:aditya.gambhir@example.com"
            aria-label="Email Aditya"
            className="social-link"
          >
            <Mail className="w-5 h-5" />
          </a>
          <button
            onClick={openContactModal}
            aria-label="Open contact form"
            className="social-link hover:text-primary"
          >
            <span className="text-sm font-medium">Contact</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
