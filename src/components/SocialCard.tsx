/**
 * SocialCard Component
 *
 * A reusable social profile card that displays information for different platforms
 * (LinkedIn, GitHub, LeetCode) with platform-specific styling and icons.
 */

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { siGithub, siLeetcode } from 'simple-icons';
import { SocialProfile } from '@/types';

interface SocialCardProps {
  readonly profile: SocialProfile;
  readonly className?: string;
}

export default function SocialCard({
  profile,
  className = '',
}: SocialCardProps) {
  const { platform, name, headline, profileUrl, details, stats } = profile;

  return (
    <div
      className={`linkedin-card flex flex-col justify-between min-h-[340px] h-full ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      <div className="flex-1 flex flex-col">
        <div className="linkedin-card-header flex items-start justify-between gap-4 mb-4">
          <div className="linkedin-card-info flex-1">
            <h3 className="linkedin-card-name">{name}</h3>
            <p className="linkedin-card-headline">{headline}</p>

            {details && details.length > 0 && (
              <div className="flex flex-col gap-2 mb-2">
                {details.map((detail) => (
                  <p key={detail.label} className="linkedin-card-detail">
                    <span className="linkedin-card-label">{detail.label}:</span>{' '}
                    {detail.value}
                  </p>
                ))}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div className="flex flex-col gap-2">
                {stats.map((stat) => (
                  <p key={stat.label} className="linkedin-card-detail">
                    <span className="linkedin-card-label">{stat.label}:</span>{' '}
                    {stat.value}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="linkedin-card-logo flex-shrink-0 self-start ml-2">
            <SocialLogo platform={platform} />
          </div>
        </div>
      </div>
      <div className="linkedin-card-footer mt-auto">
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-card-link"
          aria-label={`View ${name}'s ${platform} profile`}
        >
          <span>View {getPlatformDisplayName(platform)} Profile</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// Platform-specific logo components
function SocialLogo({ platform }: { readonly platform: string }) {
  switch (platform) {
    case 'linkedin':
      return <LinkedInLogo />;
    case 'github':
      return <GitHubLogo />;
    case 'leetcode':
      return <LeetCodeLogo />;
    default:
      return null;
  }
}

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

function GitHubLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="linkedin-logo"
    >
      <rect width="24" height="24" rx="4" fill="#24292e" />
      <path d={siGithub.path} fill="white" />
    </svg>
  );
}

function LeetCodeLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="linkedin-logo"
    >
      <rect width="24" height="24" rx="4" fill="#FFA116" />
      <path d={siLeetcode.path} fill="white" />
    </svg>
  );
}

function getPlatformDisplayName(platform: string): string {
  switch (platform) {
    case 'linkedin':
      return 'LinkedIn';
    case 'github':
      return 'GitHub';
    case 'leetcode':
      return 'LeetCode';
    default:
      return platform;
  }
}
