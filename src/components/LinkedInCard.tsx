/**
 * LinkedInCard Component
 *
 * A beautiful, custom LinkedIn card that displays professional information
 * without a profile photo to avoid duplication on the page.
 */

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface LinkedInCardProps {
  readonly name: string;
  readonly headline: string;
  readonly company?: string;
  readonly university?: string;
  readonly location?: string;
  readonly profileUrl: string;
  readonly className?: string;
}

export default function LinkedInCard({
  name,
  headline,
  company,
  university,
  location,
  profileUrl,
  className = '',
}: LinkedInCardProps) {
  return (
    <div className={`linkedin-card ${className}`}>
      <div className="linkedin-card-header">
        <div className="linkedin-card-info">
          <h3 className="linkedin-card-name">{name}</h3>
          <p className="linkedin-card-headline">{headline}</p>
          {company && (
            <p className="linkedin-card-detail">
              <span className="linkedin-card-label">Company:</span> {company}
            </p>
          )}
          {university && (
            <p className="linkedin-card-detail">
              <span className="linkedin-card-label">Education:</span>{' '}
              {university}
            </p>
          )}
          {location && (
            <p className="linkedin-card-detail">
              <span className="linkedin-card-label">Location:</span> {location}
            </p>
          )}
        </div>
        <div className="linkedin-card-logo">
          <LinkedInLogo />
        </div>
      </div>

      <div className="linkedin-card-footer">
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-card-link"
          aria-label={`View ${name}'s LinkedIn profile`}
        >
          <span>View LinkedIn Profile</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// LinkedIn Logo Component
function LinkedInLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="linkedin-logo"
    >
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M7.5 9.5V16.5H5.5V9.5H7.5ZM7.6 7.9C7.6 8.48 7.18 8.9 6.5 8.9C5.82 8.9 5.4 8.48 5.4 7.9C5.4 7.32 5.82 6.9 6.5 6.9C7.18 6.9 7.6 7.32 7.6 7.9ZM18.5 16.5H16.5V13.2C16.5 12.4 16.5 11.3 15.3 11.3C14.1 11.3 13.9 12.2 13.9 13.1V16.5H11.9V9.5H13.8V10.4H13.82C14.12 9.8 14.92 9.1 16.12 9.1C18.12 9.1 18.5 10.4 18.5 12.1V16.5Z"
        fill="white"
      />
    </svg>
  );
}
