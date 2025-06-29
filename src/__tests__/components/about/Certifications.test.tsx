import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Certifications from '@/components/about/Certifications';
import { useCertificateModal } from '@/hooks/useCertificateModal';

// Mock the certificate modal hook
jest.mock('@/hooks/useCertificateModal', () => ({
  useCertificateModal: jest.fn(() => ({
    isOpen: false,
    currentCertificate: null,
    currentIndex: 0,
    openModal: jest.fn(),
    closeModal: jest.fn(),
    navigate: jest.fn(),
  })),
}));

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({
    children,
    className,
    onClick,
    onKeyDown,
    tabIndex,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    [key: string]: unknown;
  }) => (
    <button
      className={`card ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  ),
  CardContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  ),
}));

// Mock Certificate Modal Component
jest.mock('@/components/CertificateModal', () => ({
  __esModule: true,
  default: ({
    isOpen,
    certificate,
  }: {
    isOpen: boolean;
    certificate?: { title: string } | null;
  }) =>
    isOpen ? (
      <div data-testid="certificate-modal">Modal for {certificate?.title}</div>
    ) : null,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: ({
      children,
      className,
      initial,
      whileInView,
      viewport,
      variants,
      ...props
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }: any) => (
      <section
        className={className}
        data-initial={initial}
        data-whileinview={whileInView}
        data-viewport={JSON.stringify(viewport)}
        data-variants={JSON.stringify(variants)}
        {...props}
      >
        {children}
      </section>
    ),
  },
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Calendar: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="calendar-icon" />
  ),
  Link: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="link-icon" />
  ),
}));

// Mock window.matchMedia for reduced motion
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

// Mock scrollTo and scrollBy methods that are not available in test environment
const mockScrollTo = jest.fn();
const mockScrollBy = jest.fn();
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  writable: true,
  value: mockScrollTo,
});
Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
  writable: true,
  value: mockScrollBy,
});

describe('Certifications Component', () => {
  const mockCertifications = [
    {
      title: 'Sensor Fusion Nanodegree',
      provider: 'Udacity',
      year: '2024',
      month: 'Oct',
      filePath: '/certificates/cert1.pdf',
      description: 'Advanced sensor fusion techniques',
    },
    {
      title: 'AWS Solutions Architect',
      provider: 'AWS',
      year: '2023',
      month: 'Dec',
      linkedinUrl: 'https://linkedin.com/cert',
      description: 'Cloud architecture certification',
    },
    {
      title: 'Machine Learning Basics',
      provider: 'Coursera',
      year: '2023',
      month: 'Nov',
      description: 'Fundamentals of machine learning',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockScrollTo.mockClear();
    mockScrollBy.mockClear();

    // Default to not reduced motion
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders the certifications section title', () => {
      render(<Certifications certifications={mockCertifications} />);

      const heading = screen.getByRole('heading', { name: 'Certifications' });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id', 'certifications-heading');
    });

    it('renders all certification cards', () => {
      render(<Certifications certifications={mockCertifications} />);

      expect(screen.getByText('Sensor Fusion Nanodegree')).toBeInTheDocument();
      expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning Basics')).toBeInTheDocument();
    });

    it('renders certificate providers and dates', () => {
      render(<Certifications certifications={mockCertifications} />);

      expect(screen.getByText('Udacity')).toBeInTheDocument();
      expect(screen.getByText('Oct 2024')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
      expect(screen.getByText('Dec 2023')).toBeInTheDocument();
    });

    it('renders certificate descriptions', () => {
      render(<Certifications certifications={mockCertifications} />);

      expect(
        screen.getByText('Advanced sensor fusion techniques'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Cloud architecture certification'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Fundamentals of machine learning'),
      ).toBeInTheDocument();
    });

    it('renders appropriate icons for certificates', () => {
      render(<Certifications certifications={mockCertifications} />);

      const calendarIcons = screen.getAllByTestId('calendar-icon');
      const linkIcons = screen.getAllByTestId('link-icon');

      expect(calendarIcons).toHaveLength(3); // One per certificate
      expect(linkIcons).toHaveLength(3); // One per certificate
    });
  });

  describe('Autoplay Functionality', () => {
    it('enables autoplay when reduced motion is not preferred', () => {
      mockMatchMedia.mockReturnValue({
        matches: false, // prefers-reduced-motion: no-preference
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      expect(
        screen.queryByText('Auto-scrolling is enabled • Hover to pause'),
      ).not.toBeInTheDocument();
    });

    it('disables autoplay when reduced motion is preferred', () => {
      mockMatchMedia.mockReturnValue({
        matches: true, // prefers-reduced-motion: reduce
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      expect(
        screen.queryByText('Auto-scrolling is enabled • Hover to pause'),
      ).not.toBeInTheDocument();
    });

    it('pauses autoplay on hover', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      const scrollContainer = screen.getByRole('list');

      // Hover over the container
      await user.hover(scrollContainer);

      // Banner was removed; ensure it is not present
      expect(
        screen.queryByText('Auto-scrolling is enabled • Hover to pause'),
      ).not.toBeInTheDocument();
    });

    it('resumes autoplay when hover ends', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      const scrollContainer = screen.getByRole('list');

      // Hover and then unhover
      await user.hover(scrollContainer);
      await user.unhover(scrollContainer);

      expect(
        screen.queryByText('Auto-scrolling is enabled • Hover to pause'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Enter key to open certificate modal', async () => {
      const mockOpenModal = jest.fn();

      const useCertificateModalMock = jest.mocked(useCertificateModal);
      useCertificateModalMock.mockReturnValue({
        isOpen: false,
        currentCertificate: null,
        currentIndex: 0,
        openModal: mockOpenModal,
        closeModal: jest.fn(),
        navigate: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      const firstButton = screen.getByLabelText(
        'View Sensor Fusion Nanodegree certificate',
      );

      // Simulate Enter key press on the button
      firstButton.focus();
      firstButton.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );

      expect(mockOpenModal).toHaveBeenCalled();
    });

    it('handles Space key to open certificate modal', async () => {
      const mockOpenModal = jest.fn();

      const useCertificateModalMock = jest.mocked(useCertificateModal);
      useCertificateModalMock.mockReturnValue({
        isOpen: false,
        currentCertificate: null,
        currentIndex: 0,
        openModal: mockOpenModal,
        closeModal: jest.fn(),
        navigate: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      const firstButton = screen.getByLabelText(
        'View Sensor Fusion Nanodegree certificate',
      );

      // Simulate Space key press on the button
      firstButton.focus();
      firstButton.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true }),
      );

      expect(mockOpenModal).toHaveBeenCalled();
    });

    it('pauses autoplay on focus', async () => {
      const user = userEvent.setup();

      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      render(<Certifications certifications={mockCertifications} />);

      // Ensure banner remains absent
      expect(
        screen.queryByText('Auto-scrolling is enabled • Hover to pause'),
      ).not.toBeInTheDocument();

      const firstButton = screen.getByLabelText(
        'View Sensor Fusion Nanodegree certificate',
      );

      // Focus on a certificate button
      firstButton.focus();

      // Ensure banner remains absent
      expect(
        screen.queryByText('Auto-scrolling is enabled • Hover to pause'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Certifications certifications={mockCertifications} />);

      const sections = screen.getAllByRole('region');
      const mainSection = sections.find(
        (section) =>
          section.getAttribute('aria-labelledby') === 'certifications-heading',
      );
      expect(mainSection).toHaveAttribute(
        'aria-labelledby',
        'certifications-heading',
      );

      const list = screen.getByRole('list');
      expect(list).toHaveAttribute('aria-label', 'Professional certifications');

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    it('provides descriptive aria-labels for certificates', () => {
      render(<Certifications certifications={mockCertifications} />);

      const firstButton = screen.getByLabelText(
        'View Sensor Fusion Nanodegree certificate',
      );
      expect(firstButton).toBeInTheDocument();
      expect(firstButton).toHaveAttribute(
        'aria-label',
        'View Sensor Fusion Nanodegree certificate',
      );
    });

    it('uses semantic time elements', () => {
      render(<Certifications certifications={mockCertifications} />);

      const timeElements = screen.getAllByText('Oct 2024');
      expect(timeElements[0].tagName.toLowerCase()).toBe('time');
      expect(timeElements[0]).toHaveAttribute('dateTime', '2024-Oct');
    });

    it('provides proper heading hierarchy', () => {
      render(<Certifications certifications={mockCertifications} />);

      const mainHeading = screen.getByRole('heading', {
        name: 'Certifications',
      });
      expect(mainHeading).toBeInTheDocument();

      const certTitles = screen.getAllByRole('heading');
      const filteredTitles = certTitles.filter((h) => h.tagName === 'H3');
      expect(filteredTitles).toHaveLength(3);
    });

    it('has accessible icon labels', () => {
      render(<Certifications certifications={mockCertifications} />);

      // Check for aria-labels on indicator icons
      const documentIcons = screen.getAllByLabelText(
        'Certificate document available',
      );
      expect(documentIcons).toHaveLength(1); // Only first cert has filePath

      const verifiedIcons = screen.getAllByLabelText(
        'LinkedIn verified certificate',
      );
      expect(verifiedIcons).toHaveLength(1); // Only second cert has linkedinUrl
    });
  });

  describe('Horizontal Scroll Behavior', () => {
    it('renders certificates in horizontal layout', () => {
      render(<Certifications certifications={mockCertifications} />);

      const scrollContainer = screen.getByLabelText(
        'Scrollable certifications container',
      );
      expect(scrollContainer).toHaveClass('overflow-x-auto');

      const cardsContainer = screen.getByRole('list');
      expect(cardsContainer).toHaveClass('flex');
    });

    it('applies minimum width to certificate cards', () => {
      render(<Certifications certifications={mockCertifications} />);

      const cardButtons = screen
        .getAllByRole('listitem')
        .map((item) => item.querySelector('button'));
      cardButtons.forEach((button) => {
        expect(button).toHaveClass('min-w-80');
      });
    });

    it('shows certificate indicators correctly', () => {
      render(<Certifications certifications={mockCertifications} />);

      // First certificate should show document icon (has filePath)
      const firstCard = screen.getAllByRole('listitem')[0];
      expect(
        firstCard.querySelector('[title="Certificate available"]'),
      ).toBeInTheDocument();

      // Second certificate should show LinkedIn icon (has linkedinUrl)
      const secondCard = screen.getAllByRole('listitem')[1];
      expect(
        secondCard.querySelector('[title="LinkedIn verified"]'),
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty certifications array', () => {
      render(<Certifications certifications={[]} />);

      expect(screen.getByText('Certifications')).toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    it('handles certifications without optional fields', () => {
      const minimalCert = [
        {
          title: 'Basic Cert',
          provider: 'Provider',
          year: '2024',
        },
      ];

      render(<Certifications certifications={minimalCert} />);

      expect(screen.getByText('Basic Cert')).toBeInTheDocument();
      expect(screen.getByText('Provider')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
    });

    it('handles single certification', () => {
      const singleCert = [mockCertifications[0]];
      render(<Certifications certifications={singleCert} />);

      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(1);
      expect(screen.getByText('Sensor Fusion Nanodegree')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('cleans up timers on unmount', () => {
      const { unmount } = render(
        <Certifications certifications={mockCertifications} />,
      );

      // Start autoplay
      jest.advanceTimersByTime(1000);

      unmount();

      // Should not have any pending timers
      expect(jest.getTimerCount()).toBe(0);
    });

    it('uses proper keys for certificate items', () => {
      const { container } = render(
        <Certifications certifications={mockCertifications} />,
      );

      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(3);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
