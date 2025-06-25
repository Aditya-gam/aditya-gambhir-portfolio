/**
 * MobileSocialCarousel Component
 *
 * Mobile-optimized carousel for social profiles using the generic Carousel component.
 * Active when screen width is below lg breakpoint (< 1024px).
 */

'use client';

import { SocialProfile } from '@/types';
import { Carousel } from '@/components/ui/carousel';
import SocialCard from './SocialCard';

interface MobileSocialCarouselProps {
  readonly profiles: SocialProfile[];
  readonly title?: string;
  readonly className?: string;
}

export default function MobileSocialCarousel({
  profiles,
  title = 'Connect With Me',
  className = '',
}: MobileSocialCarouselProps) {
  return (
    <Carousel
      items={profiles}
      renderItem={(profile) => <SocialCard profile={profile} />}
      getItemKey={(profile) => `${profile.platform}-${profile.username}`}
      title={title}
      className={`mobile-social-carousel ${className}`}
      showIndicators={true}
      showCounter={true}
      showNavigation={true}
    />
  );
}
