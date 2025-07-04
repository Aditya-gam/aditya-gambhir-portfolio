'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { MessageCircle } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { ContactModalContext } from '@/app/ContactModalContext';
import { aboutData } from '@/data/about';
import { getSocialProfileByPlatform } from '@/data/socials';
import { HEADER_FOOTER_CONTENT } from '@/data/content';
import { SITE_CONFIG } from '@/data/metadata';

// GitHub icon from simple-icons
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
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
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Contact icon component
const ContactIcon = ({ className }: { className?: string }) => (
  <MessageCircle className={className} />
);

export default function Footer() {
  const { openContactModal } = useContext(ContactModalContext);

  const authorName = aboutData.hero.name;
  const githubProfile = getSocialProfileByPlatform('github');
  const linkedinProfile = getSocialProfileByPlatform('linkedin');

  const githubUrl = githubProfile?.profileUrl ?? SITE_CONFIG.author.github;
  const linkedinUrl =
    linkedinProfile?.profileUrl ?? SITE_CONFIG.author.linkedin;

  return (
    <footer className="bg-muted/30 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={HEADER_FOOTER_CONTENT.footer.socialLinks.github}
            >
              <GitHubIcon className="w-5 h-5" />
            </Link>
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={HEADER_FOOTER_CONTENT.footer.socialLinks.linkedin}
            >
              <LinkedInIcon className="w-5 h-5" />
            </Link>
            {/* Contact button - only visible on mobile screens where MobileNav is active */}
            <button
              onClick={openContactModal}
              className="lg:hidden inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={HEADER_FOOTER_CONTENT.footer.socialLinks.contact}
            >
              <ContactIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            {HEADER_FOOTER_CONTENT.footer.copyright(
              new Date().getFullYear(),
              authorName,
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
