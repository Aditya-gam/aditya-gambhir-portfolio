import React from 'react';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    className,
    ...props
  }: {
    src: string;
    alt: string;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-testid="next-image-mock"
        {...props}
      />
    );
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <section className={className} {...props}>
        {children}
      </section>
    ),
    div: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock the social profiles data
jest.mock('../../../data/socials', () => ({
  getFeaturedSocialProfiles: () => [
    {
      platform: 'linkedin',
      name: 'Aditya Gambhir',
      username: 'aditya-gambhir',
      headline: 'Test headline',
      profileUrl: 'https://linkedin.com/in/aditya-gambhir',
      details: [],
      stats: [],
    },
  ],
}));

// Mock useMediaQuery hook
jest.mock('../../../hooks/useMediaQuery', () => ({
  useIsMobile: () => false,
}));

// Mock SocialProfiles component
jest.mock('../../../components/SocialProfiles', () => {
  return function MockSocialProfiles({
    profiles,
  }: {
    profiles: Array<{ platform: string; name: string; headline: string }>;
  }) {
    return (
      <div data-testid="social-profiles">
        {profiles.map((profile) => (
          <div key={profile.platform}>
            <span>{profile.name}</span>
            <span>{profile.headline}</span>
          </div>
        ))}
      </div>
    );
  };
});

// Mock hero components
jest.mock('../../../components/hero', () => ({
  OpportunityBadge: () => (
    <div data-testid="opportunity-badge">Open to Opportunities</div>
  ),
  HeroCTAGroup: ({
    onContactClick,
    onResumeClick,
  }: {
    onContactClick: () => void;
    onResumeClick?: () => void;
  }) => (
    <div data-testid="hero-cta-group">
      <button onClick={onResumeClick}>Download Resume</button>
      <button onClick={onContactClick}>Let&apos;s Talk</button>
    </div>
  ),
  ScrollCue: () => (
    <button data-testid="scroll-cue" aria-label="Scroll to next section">
      Scroll to next section
    </button>
  ),
}));

// Silence Next.js <img> warning in tests
jest.spyOn(console, 'error').mockImplementation((msg, ...args) => {
  if (
    typeof msg === 'string' &&
    msg.includes('Using `<img>` could result in slower LCP')
  ) {
    return;
  }
  return globalThis.console.error(msg, ...args);
});
