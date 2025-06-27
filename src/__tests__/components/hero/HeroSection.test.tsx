import { render, screen } from '@testing-library/react';
import { ContactModalContext } from '@/app/ContactModalContext';
import { ResumeModalProvider } from '@/contexts/ResumeModalContext';
import HeroSection from '@/components/hero/HeroSection';

// Mock the social profiles data
jest.mock('@/data/socials', () => ({
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

const mockContactModalContext = {
  isOpen: false,
  openContactModal: jest.fn(),
  closeContactModal: jest.fn(),
};

describe('HeroSection', () => {
  const renderHeroSection = () => {
    return render(
      <ContactModalContext.Provider value={mockContactModalContext}>
        <ResumeModalProvider>
          <HeroSection />
        </ResumeModalProvider>
      </ContactModalContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the hero section with all required elements', () => {
    renderHeroSection();

    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Hello, I'm Aditya")).toBeInTheDocument();

    // Check for subtitle
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText('Software Engineer & Data Scientist'),
    ).toBeInTheDocument();

    // Check for opportunity badge
    expect(screen.getByText('Open to Opportunities')).toBeInTheDocument();

    // Check for CTA buttons
    expect(
      screen.getByRole('button', { name: /download resume/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /let's talk/i }),
    ).toBeInTheDocument();

    // Check for profile image
    expect(
      screen.getByAltText('Aditya Gambhir - Software Engineer'),
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderHeroSection();

    const heroSection = screen.getByRole('region');
    expect(heroSection).toHaveAttribute('aria-labelledby', 'hero-heading');
    expect(heroSection).toHaveAttribute('id', 'hero');
  });

  it('renders scroll cue button with proper accessibility', () => {
    renderHeroSection();

    const scrollButton = screen.getByRole('button', {
      name: /scroll to next section/i,
    });
    expect(scrollButton).toBeInTheDocument();
    expect(scrollButton).toHaveAttribute(
      'aria-label',
      'Scroll to next section',
    );
  });

  it('renders social profiles section', () => {
    renderHeroSection();

    // Check for LinkedIn profile
    expect(screen.getByText('Aditya Gambhir')).toBeInTheDocument();
    expect(screen.getByText('Test headline')).toBeInTheDocument();
  });
});
