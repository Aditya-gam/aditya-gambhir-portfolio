/**
 * SocialProfiles Component
 *
 * Displays a collection of social profile cards in a responsive layout
 * similar to the ProjectCarousel component. Automatically switches to
 * mobile carousel on smaller screens.
 */

'use client';

import SocialCard from './SocialCard';
import MobileSocialCarousel from './MobileSocialCarousel';
import { SocialProfile } from '@/types';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface SocialProfilesProps {
  readonly profiles: SocialProfile[];
  readonly title?: string;
  readonly className?: string;
  readonly iconOnly?: boolean;
}

export default function SocialProfiles({
  profiles,
  title = 'Connect With Me',
  className = '',
  iconOnly = false,
}: SocialProfilesProps) {
  const isMobile = useIsMobile();

  if (profiles.length === 0) return null;

  // Simple icon-only list variant
  if (iconOnly) {
    const renderIcon = (platform: string) => {
      switch (platform) {
        case 'linkedin':
          return (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          );
        case 'github':
          return (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .297a12 12 0 00-3.792 23.39c.6.11.82-.26.82-.58v-2.03c-3.338.73-4.042-1.61-4.042-1.61-.546-1.39-1.332-1.762-1.332-1.762-1.09-.744.084-.73.084-.73 1.205.084 1.84 1.235 1.84 1.235 1.07 1.833 2.807 1.303 3.492.996.108-.775.42-1.303.762-1.603-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.534-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 016 0c2.292-1.552 3.3-1.23 3.3-1.23.651 1.649.24 2.873.118 3.176.768.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222v3.293c0 .323.22.694.825.576A12.004 12.004 0 0012 .297" />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div className={`flex flex-col gap-6 ${className}`.trim()}>
        {title && <h2 className="heading-section text-left mb-4">{title}</h2>}
        <ul className="space-y-6">
          {profiles.map((profile) => (
            <li key={profile.platform} className="flex">
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label={`Visit ${profile.platform} profile`}
              >
                {renderIcon(profile.platform)}
                <div className="flex flex-col text-left">
                  <span className="font-medium text-foreground">
                    {profile.platform === 'github' ? 'GitHub' : 'LinkedIn'}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {profile.platform === 'github'
                      ? `@${profile.username}`
                      : profile.name}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Use mobile carousel for screens below lg breakpoint
  if (isMobile) {
    return (
      <MobileSocialCarousel
        profiles={profiles}
        title={title}
        className={className}
      />
    );
  }

  // Desktop layout - determine layout based on number of profiles
  const getLayoutClasses = () => {
    switch (profiles.length) {
      case 1:
        return {
          container: 'flex justify-center',
          item: 'w-full max-w-md',
        };
      case 2:
        return {
          container: 'flex justify-center gap-6',
          item: 'w-full max-w-sm',
        };
      case 3:
        return {
          container: 'flex justify-center gap-4',
          item: 'w-full max-w-xs',
        };
      default:
        return {
          container: 'flex gap-4 overflow-x-auto social-profiles-scroll pb-4',
          item: 'flex-shrink-0 w-80',
        };
    }
  };

  const { container, item } = getLayoutClasses();

  return (
    <div className={`social-profiles-section ${className}`}>
      {title && <h2 className="heading-section text-center mb-8">{title}</h2>}

      <div className="w-full max-w-6xl mx-auto px-4">
        <div
          className={container}
          style={{
            minWidth: profiles.length > 3 ? 'max-content' : 'auto',
          }}
        >
          {profiles.map((profile) => (
            <div
              key={`${profile.platform}-${profile.username}`}
              className={item}
            >
              <SocialCard profile={profile} />
            </div>
          ))}
        </div>

        {/* Show scroll hint for 4+ profiles */}
        {profiles.length > 3 && (
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              Scroll horizontally to view all {profiles.length} profiles
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
