/**
 * SocialProfiles Component
 *
 * Displays a collection of social profile cards in a responsive layout
 * similar to the ProjectCarousel component.
 */

'use client';

import SocialCard from './SocialCard';
import { SocialProfile } from '@/types';

interface SocialProfilesProps {
  profiles: SocialProfile[];
  title?: string;
  className?: string;
}

export default function SocialProfiles({
  profiles,
  title = 'Connect With Me',
  className = '',
}: SocialProfilesProps) {
  if (profiles.length === 0) return null;

  // Determine layout based on number of profiles
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
          {profiles.map((profile, index) => (
            <div
              key={`${profile.platform}-${profile.username}`}
              className={item}
            >
              <SocialCard
                profile={profile}
                priority={index < 3} // Prioritize first 3 for loading
              />
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
