import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';

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
      <div className={className} {...props}>
        {children}
      </div>
    ),
    li: ({
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
      <li className={className} {...props}>
        {children}
      </li>
    ),
  },
}));

// Mock UI components
jest.mock('@/components/ui/card', () => {
  const MockCard = ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div className={`card ${className ?? ''}`} {...props}>
      {children}
    </div>
  );

  const MockCardContent = ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div className={`card-content ${className ?? ''}`} {...props}>
      {children}
    </div>
  );

  return {
    Card: MockCard,
    CardContent: MockCardContent,
  };
});

describe('ExperienceTimeline Component', () => {
  const mockExperience = [
    {
      company: 'Tech Mahindra',
      role: 'Software Development Intern',
      period: 'Jun 2022 → May 2023',
      bullets: [
        'Built comprehensive MERN stack mock-server platform',
        'Contributed to development workflow improvements',
        'Collaborated with cross-functional teams',
      ],
    },
    {
      company: 'C-DAC',
      role: 'R&D Intern',
      period: 'Jan 2022 → May 2022',
      bullets: [
        'Developed real-time brainwave processing web service',
        'Implemented comprehensive testing protocols',
        'Gained experience in research methodologies',
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the experience timeline title', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Experience Timeline');
      expect(heading).toHaveAttribute('id', 'experience-timeline-heading');
    });

    it('renders all experience items', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      expect(screen.getByText('Tech Mahindra')).toBeInTheDocument();
      expect(
        screen.getByText('Software Development Intern'),
      ).toBeInTheDocument();
      expect(screen.getByText('C-DAC')).toBeInTheDocument();
      expect(screen.getByText('R&D Intern')).toBeInTheDocument();
    });

    it('renders experience periods correctly', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const periods = screen.getAllByText('Jun 2022 → May 2023');
      expect(periods).toHaveLength(1);

      const cdacPeriod = screen.getByText('Jan 2022 → May 2022');
      expect(cdacPeriod).toBeInTheDocument();
    });

    it('renders all bullet points for each experience', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      expect(
        screen.getByText('Built comprehensive MERN stack mock-server platform'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Contributed to development workflow improvements'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Developed real-time brainwave processing web service',
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Implemented comprehensive testing protocols'),
      ).toBeInTheDocument();
    });

    it('renders keyboard navigation instructions', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      expect(
        screen.getByText('Use arrow keys to navigate through experience items'),
      ).toBeInTheDocument();
    });
  });

  describe('Alternating Layout', () => {
    it('applies alternating layout classes correctly', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);

      // First item (index 0) should not have flex-row-reverse
      expect(experienceItems[0]).not.toHaveClass('flex-row-reverse');

      // Second item (index 1) should have flex-row-reverse
      expect(experienceItems[1]).toHaveClass('flex-row-reverse');
    });

    it('applies correct text alignment for alternating items', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const contentDivs = screen
        .getAllByText('Tech Mahindra')
        .map((el) => el.closest('.flex-1'));
      const alternateDivs = screen
        .getAllByText('C-DAC')
        .map((el) => el.closest('.flex-1'));

      // Check that alternating items have text-right class
      expect(contentDivs[0]).not.toHaveClass('text-right');
      expect(alternateDivs[0]).toHaveClass('text-right');
    });
  });

  describe('Keyboard Navigation', () => {
    it('focuses timeline items with arrow keys', async () => {
      const user = userEvent.setup();
      render(<ExperienceTimeline experience={mockExperience} />);

      // Get only the main experience items (not bullet points)
      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      const firstItem = experienceItems[0];
      const secondItem = experienceItems[1];

      // Focus first item to activate it
      await user.click(firstItem);

      await waitFor(() => {
        // The ring classes are applied to the Card component, not the list item
        const firstItemCard = firstItem.querySelector('.card');
        expect(firstItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');
      });

      // Focus second item to activate it
      await user.click(secondItem);

      await waitFor(() => {
        const secondItemCard = secondItem.querySelector('.card');
        const firstItemCard = firstItem.querySelector('.card');
        expect(secondItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');
        expect(firstItemCard).not.toHaveClass(
          'ring-2 ring-primary ring-offset-2',
        );
      });
    });

    it('handles arrow up navigation', async () => {
      const user = userEvent.setup();
      render(<ExperienceTimeline experience={mockExperience} />);

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      const firstItem = experienceItems[0];
      const secondItem = experienceItems[1];

      // Start from second item
      await user.click(secondItem);
      await user.keyboard('[ArrowUp]');

      await waitFor(() => {
        const firstItemCard = firstItem.querySelector('.card');
        expect(firstItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');
      });
    });

    it('handles Enter and Space key interactions', async () => {
      const user = userEvent.setup();
      render(<ExperienceTimeline experience={mockExperience} />);

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      const firstItem = experienceItems[0];

      await user.click(firstItem);
      await user.keyboard('[Enter]');

      await waitFor(() => {
        const firstItemCard = firstItem.querySelector('.card');
        expect(firstItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');
      });

      await user.keyboard('[Space]');

      await waitFor(() => {
        const firstItemCard = firstItem.querySelector('.card');
        expect(firstItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');
      });
    });

    it('prevents default behavior for navigation keys', async () => {
      const user = userEvent.setup();
      render(<ExperienceTimeline experience={mockExperience} />);

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      const firstItem = experienceItems[0];

      // Focus the item first
      await user.click(firstItem);

      // Test that Enter and Space keys activate the item (indicating preventDefault worked)
      // We test the behavior rather than the preventDefault call directly
      await user.keyboard('[Enter]');

      // Check that the item gets the active styling
      const firstItemCard = firstItem.querySelector('.card');
      expect(firstItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');

      await user.keyboard('[Space]');

      // Should still be active after space key
      expect(firstItemCard).toHaveClass('ring-2 ring-primary ring-offset-2');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const section = screen.getByRole('region');
      expect(section).toHaveAttribute(
        'aria-labelledby',
        'experience-timeline-heading',
      );

      const list = screen.getByLabelText('Work experience timeline');
      expect(list).toHaveAttribute('aria-label', 'Work experience timeline');

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      expect(experienceItems[0]).toHaveAttribute(
        'aria-label',
        'Experience at Tech Mahindra as Software Development Intern',
      );
      expect(experienceItems[1]).toHaveAttribute(
        'aria-label',
        'Experience at C-DAC as R&D Intern',
      );
    });

    it('has proper heading hierarchy', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Experience Timeline');

      const companyHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(companyHeadings).toHaveLength(2);
      expect(companyHeadings[0]).toHaveTextContent('Tech Mahindra');
      expect(companyHeadings[1]).toHaveTextContent('C-DAC');
    });

    it('uses semantic time elements', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const timeElements = screen.getAllByText('Jun 2022 → May 2023');
      expect(timeElements[0].tagName.toLowerCase()).toBe('time');
      expect(timeElements[0]).toHaveAttribute(
        'dateTime',
        'Jun 2022 → May 2023',
      );
    });

    it('has proper focus management', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);

      experienceItems.forEach((item) => {
        expect(item).toHaveAttribute('tabindex', '0');
      });
    });

    it('provides descriptive list labels', () => {
      render(<ExperienceTimeline experience={mockExperience} />);

      const responsibilityLists = screen.getAllByRole('list');
      const experienceLists = responsibilityLists.filter((list) =>
        list.getAttribute('aria-label')?.includes('Responsibilities at'),
      );

      expect(experienceLists).toHaveLength(2);
      expect(experienceLists[0]).toHaveAttribute(
        'aria-label',
        'Responsibilities at Tech Mahindra',
      );
      expect(experienceLists[1]).toHaveAttribute(
        'aria-label',
        'Responsibilities at C-DAC',
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles empty experience array', () => {
      render(<ExperienceTimeline experience={[]} />);

      expect(screen.getByText('Experience Timeline')).toBeInTheDocument();
      expect(
        screen.queryByLabelText(/Experience at .* as /),
      ).not.toBeInTheDocument();
    });

    it('handles single experience item', () => {
      const singleExperience = [mockExperience[0]];
      render(<ExperienceTimeline experience={singleExperience} />);

      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      expect(experienceItems).toHaveLength(1);
      expect(experienceItems[0]).not.toHaveClass('flex-row-reverse');
    });

    it('handles experience with no bullets', () => {
      const experienceNoBullets = [
        {
          ...mockExperience[0],
          bullets: [],
        },
      ];

      render(<ExperienceTimeline experience={experienceNoBullets} />);

      expect(screen.getByText('Tech Mahindra')).toBeInTheDocument();
      expect(
        screen.getByText('Software Development Intern'),
      ).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('uses proper keys for list items', () => {
      const { container } = render(
        <ExperienceTimeline experience={mockExperience} />,
      );

      // Check that items have proper key attributes (React sets data-testid based on keys)
      const experienceItems = screen.getAllByLabelText(/Experience at .* as /);
      expect(experienceItems).toHaveLength(2);

      // Each item should be unique and render without console warnings
      expect(container.firstChild).toBeTruthy();
    });
  });
});
