import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Education from '@/components/about/Education';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: ({
      children,
      className,
      initial: _initial,
      animate: _animate,
      whileInView: _whileInView,
      viewport: _viewport,
      variants: _variants,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      initial?: unknown;
      animate?: unknown;
      whileInView?: unknown;
      viewport?: unknown;
      variants?: unknown;
      [key: string]: unknown;
    }) => (
      <section className={className} data-framer-motion {...props}>
        {children}
      </section>
    ),
    div: ({
      children,
      className,
      initial: _initial,
      animate: _animate,
      whileInView: _whileInView,
      viewport: _viewport,
      variants: _variants,
      whileHover: _whileHover,
      transition: _transition,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      initial?: unknown;
      animate?: unknown;
      whileInView?: unknown;
      viewport?: unknown;
      variants?: unknown;
      whileHover?: unknown;
      transition?: unknown;
      [key: string]: unknown;
    }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
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

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  GraduationCap: ({
    className,
    'aria-hidden': ariaHidden,
  }: {
    className?: string;
    'aria-hidden'?: boolean;
  }) => (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      data-testid="graduation-cap-icon"
    >
      <title>Graduation Cap</title>
    </svg>
  ),
  Award: ({
    className,
    'aria-hidden': ariaHidden,
  }: {
    className?: string;
    'aria-hidden'?: boolean;
  }) => (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      data-testid="award-icon"
    >
      <title>Award</title>
    </svg>
  ),
}));

describe('Education Component', () => {
  const mockEducation = [
    {
      degree: 'M.S. Computational Data Science',
      school: 'University of California, Riverside',
      gpa: '3.67',
      courses: ['Big Data', 'AI', 'Spatial Computing', 'ML'],
    },
    {
      degree: 'B.Tech Computer Science',
      school: 'Example University',
      gpa: '3.8',
      courses: ['Data Structures', 'Algorithms', 'Operating Systems'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the education section title', () => {
      render(<Education education={mockEducation} />);

      const heading = screen.getByRole('heading', { name: 'Education' });
      expect(heading).toHaveTextContent('Education');
      expect(heading).toHaveAttribute('id', 'education-heading');
    });

    it('renders all education records', () => {
      render(<Education education={mockEducation} />);

      expect(
        screen.getByText('M.S. Computational Data Science'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('University of California, Riverside'),
      ).toBeInTheDocument();
      expect(screen.getByText('B.Tech Computer Science')).toBeInTheDocument();
      expect(screen.getByText('Example University')).toBeInTheDocument();
    });

    it('renders GPA badges correctly', () => {
      render(<Education education={mockEducation} />);

      expect(screen.getByText('GPA: 3.67')).toBeInTheDocument();
      expect(screen.getByText('GPA: 3.8')).toBeInTheDocument();
    });

    it('renders all courses for each education record', () => {
      render(<Education education={mockEducation} />);

      // First education courses
      expect(screen.getByText('Big Data')).toBeInTheDocument();
      expect(screen.getByText('AI')).toBeInTheDocument();
      expect(screen.getByText('Spatial Computing')).toBeInTheDocument();
      expect(screen.getByText('ML')).toBeInTheDocument();

      // Second education courses
      expect(screen.getByText('Data Structures')).toBeInTheDocument();
      expect(screen.getByText('Algorithms')).toBeInTheDocument();
      expect(screen.getByText('Operating Systems')).toBeInTheDocument();
    });

    it('renders graduation cap icons', () => {
      render(<Education education={mockEducation} />);

      const graduationIcons = screen.getAllByTestId('graduation-cap-icon');
      expect(graduationIcons).toHaveLength(2);
    });

    it('renders award icons for GPA badges', () => {
      render(<Education education={mockEducation} />);

      const awardIcons = screen.getAllByTestId('award-icon');
      expect(awardIcons).toHaveLength(2);
    });

    it('renders relevant coursework sections', () => {
      render(<Education education={mockEducation} />);

      const courseworkHeaders = screen.getAllByText('Relevant Coursework');
      expect(courseworkHeaders).toHaveLength(2);
    });
  });

  describe('PublicationCard Variant Pattern', () => {
    it('follows publication card styling with hover effects', () => {
      render(<Education education={mockEducation} />);

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(2);

      // The classes are actually on the Card component, not the article
      const cardContainers = cards.map((card) => card.closest('.card'));
      cardContainers.forEach((card) => {
        expect(card).toHaveClass('border-l-4 border-l-primary');
        expect(card).toHaveClass('hover:shadow-md hover:border-primary/20');
      });
    });

    it('has proper card layout structure', () => {
      render(<Education education={mockEducation} />);

      const cards = screen.getAllByRole('article');

      cards.forEach((card, index) => {
        // Each card should have proper labeling
        expect(card).toHaveAttribute(
          'aria-labelledby',
          `education-${index}-title`,
        );

        // Check for proper internal structure
        const titleElement = card.querySelector(`#education-${index}-title`);
        expect(titleElement).toBeInTheDocument();
      });
    });

    it('applies consistent spacing and layout', () => {
      render(<Education education={mockEducation} />);

      const cardContainer = screen.getByText('Education').nextElementSibling;
      expect(cardContainer).toHaveClass('space-y-6');

      // The max-w-4xl mx-auto class is on the motion.div wrapper, not the article
      const cards = screen.getAllByRole('article');
      cards.forEach((card) => {
        const wrapper = card.closest('.max-w-4xl');
        expect(wrapper).toHaveClass('max-w-4xl mx-auto');
      });
    });
  });

  describe('Data-driven Functionality', () => {
    it('handles single education record', () => {
      const singleEducation = [mockEducation[0]];
      render(<Education education={singleEducation} />);

      expect(
        screen.getByText('M.S. Computational Data Science'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('B.Tech Computer Science'),
      ).not.toBeInTheDocument();

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(1);
    });

    it('handles empty education array', () => {
      render(<Education education={[]} />);

      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });

    it('handles education with no courses', () => {
      const educationNoCourses = [
        {
          ...mockEducation[0],
          courses: [],
        },
      ];

      render(<Education education={educationNoCourses} />);

      expect(
        screen.getByText('M.S. Computational Data Science'),
      ).toBeInTheDocument();
      expect(screen.getByText('Relevant Coursework')).toBeInTheDocument();

      // Should still render the coursework section but with no course chips
      expect(screen.queryByText('Big Data')).not.toBeInTheDocument();
    });

    it('generates unique keys for multiple records', () => {
      render(<Education education={mockEducation} />);

      // React should handle multiple similar records without key warnings
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(2);
      expect(cards[0]).not.toBe(cards[1]);
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive layout classes', () => {
      render(<Education education={mockEducation} />);

      const cards = screen.getAllByRole('article');

      cards.forEach((card) => {
        const headerDiv = card.querySelector('.sm\\:flex-row');
        expect(headerDiv).toBeInTheDocument();
      });
    });

    it('handles course chips responsively', () => {
      render(<Education education={mockEducation} />);

      const courseContainers = screen
        .getAllByText('Relevant Coursework')
        .map((header) => header.nextElementSibling);

      courseContainers.forEach((container) => {
        expect(container).toHaveClass('flex flex-wrap gap-2');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Education education={mockEducation} />);

      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-labelledby', 'education-heading');

      const articles = screen.getAllByRole('article');
      expect(articles[0]).toHaveAttribute(
        'aria-labelledby',
        'education-0-title',
      );
      expect(articles[1]).toHaveAttribute(
        'aria-labelledby',
        'education-1-title',
      );
    });

    it('has proper heading hierarchy', () => {
      render(<Education education={mockEducation} />);

      const mainHeading = screen.getByRole('heading', { name: 'Education' });
      expect(mainHeading).toHaveTextContent('Education');

      const allHeadings = screen.getAllByRole('heading');
      const degreeHeadings = allHeadings.filter((h) => h.tagName === 'H3');
      expect(degreeHeadings).toHaveLength(2);
      expect(degreeHeadings[0]).toHaveTextContent(
        'M.S. Computational Data Science',
      );
      expect(degreeHeadings[1]).toHaveTextContent('B.Tech Computer Science');
    });

    it('has descriptive labels for screen readers', () => {
      render(<Education education={mockEducation} />);

      const courseworkSections = screen.getAllByText('Relevant Coursework');
      expect(courseworkSections).toHaveLength(2);

      courseworkSections.forEach((section) => {
        expect(section.tagName.toLowerCase()).toBe('h4');
      });
    });

    it('properly hides decorative icons from screen readers', () => {
      render(<Education education={mockEducation} />);

      const graduationIcons = screen.getAllByTestId('graduation-cap-icon');
      const awardIcons = screen.getAllByTestId('award-icon');

      [...graduationIcons, ...awardIcons].forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('passes axe accessibility tests', async () => {
      const { container } = render(<Education education={mockEducation} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color and Contrast', () => {
    it('applies proper color classes for contrast', () => {
      render(<Education education={mockEducation} />);

      // Check GPA badges have proper contrast
      const gpaBadges = screen.getAllByText(/GPA:/);
      gpaBadges.forEach((badge) => {
        const container = badge.closest('.bg-primary\\/10');
        expect(container).toBeInTheDocument();
      });

      // Check course chips have proper contrast
      const courseChips = screen
        .getAllByText('Big Data')
        .map((el) => el.closest('.bg-primary\\/10'));
      courseChips.forEach((chip) => {
        expect(chip).toHaveClass('text-primary');
      });
    });
  });

  describe('Interactive Elements', () => {
    it('applies hover effects to course chips', () => {
      render(<Education education={mockEducation} />);

      const courseChip = screen.getByText('Big Data');
      expect(courseChip).toHaveClass('hover:bg-primary/20');
    });

    it('applies hover effects to cards', () => {
      render(<Education education={mockEducation} />);

      const cards = screen.getAllByRole('article');
      // The hover classes are on the Card component, not the article
      const cardContainers = cards.map((card) => card.closest('.card'));
      cardContainers.forEach((card) => {
        expect(card).toHaveClass('hover:shadow-md hover:border-primary/20');
      });
    });
  });

  describe('Performance', () => {
    it('uses proper keys for education records', () => {
      const { container } = render(<Education education={mockEducation} />);

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(2);

      // Each card should be unique
      expect(container.firstChild).toBeTruthy();
    });

    it('renders icons efficiently', () => {
      render(<Education education={mockEducation} />);

      // Icons should be rendered the correct number of times
      const graduationIcons = screen.getAllByTestId('graduation-cap-icon');
      const awardIcons = screen.getAllByTestId('award-icon');

      expect(graduationIcons).toHaveLength(2); // One per education record
      expect(awardIcons).toHaveLength(2); // One per GPA badge
    });
  });
});
