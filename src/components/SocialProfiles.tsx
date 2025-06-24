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
}

export default function SocialProfiles({
  profiles,
  title = 'Connect With Me',
  className = '',
}: SocialProfilesProps) {
  const isMobile = useIsMobile();

  if (profiles.length === 0) return null;

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
