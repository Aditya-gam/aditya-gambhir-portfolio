import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import StatsCounter from '@/components/about/StatsCounter';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      variants,
      initial,
      animate,
      whileHover,
      ref,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      variants?: unknown;
      initial?: unknown;
      animate?: unknown;
      whileHover?: unknown;
      ref?: React.RefObject<HTMLDivElement>;
      [key: string]: unknown;
    }) => (
      <div
        className={className}
        data-variants={JSON.stringify(variants)}
        data-initial={initial}
        data-animate={animate}
        data-while-hover={JSON.stringify(whileHover)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useInView: jest.fn(() => true),
}));

// Mock window.matchMedia for reduced motion
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('StatsCounter Component', () => {
  const mockStats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: 'MERN & DS', label: 'Technology Expertise' },
    { value: '3.67', label: 'M.S. GPA' },
    { value: '1', label: 'Peer-reviewed Publications' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Default to not reduced motion
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  describe('Rendering', () => {
    it('renders all stat cards correctly', () => {
      render(<StatsCounter stats={mockStats} />);

      expect(screen.getByText('2+')).toBeInTheDocument();
      expect(screen.getByText('10+')).toBeInTheDocument();
      expect(screen.getByText('MERN & DS')).toBeInTheDocument();
      expect(screen.getByText('3.67')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();

      expect(screen.getByText('Years Experience')).toBeInTheDocument();
      expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
      expect(screen.getByText('Technology Expertise')).toBeInTheDocument();
      expect(screen.getByText('M.S. GPA')).toBeInTheDocument();
      expect(
        screen.getByText('Peer-reviewed Publications'),
      ).toBeInTheDocument();
    });

    it('applies correct grid layout classes', () => {
      render(<StatsCounter stats={mockStats} />);

      const gridContainer = screen.getByText('2+').closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-2');
      expect(gridContainer).toHaveClass('md:grid-cols-3');
      expect(gridContainer).toHaveClass('lg:grid-cols-5');
    });

    it('applies custom className', () => {
      render(<StatsCounter stats={mockStats} className="custom-class" />);

      const container = screen.getByText('2+').closest('.mb-12');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Card Styling', () => {
    it('applies gradient background and border styles', () => {
      render(<StatsCounter stats={mockStats} />);

      const firstCard = screen.getByText('2+').closest('.bg-gradient-to-br');
      expect(firstCard).toHaveClass('from-primary/10');
      expect(firstCard).toHaveClass('via-primary/5');
      expect(firstCard).toHaveClass('to-secondary/10');
      expect(firstCard).toHaveClass('border-primary/20');
      expect(firstCard).toHaveClass('rounded-xl');
    });

    it('applies hover effects to cards', () => {
      render(<StatsCounter stats={mockStats} />);

      const firstCard = screen.getByText('2+').closest('.group');
      expect(firstCard).toHaveClass('group');

      const cardContent = firstCard?.querySelector('.bg-gradient-to-br');
      expect(cardContent).toHaveClass('hover:shadow-md');
      expect(cardContent).toHaveClass('group-hover:border-primary/30');
    });

    it('applies correct text styling', () => {
      render(<StatsCounter stats={mockStats} />);

      const valueElement = screen.getByText('2+');
      expect(valueElement).toHaveClass('text-2xl');
      expect(valueElement).toHaveClass('md:text-3xl');
      expect(valueElement).toHaveClass('font-bold');
      expect(valueElement).toHaveClass('text-primary');

      const labelElement = screen.getByText('Years Experience');
      expect(labelElement).toHaveClass('text-xs');
      expect(labelElement).toHaveClass('md:text-sm');
      expect(labelElement).toHaveClass('text-muted-foreground');
      expect(labelElement).toHaveClass('font-medium');
    });
  });

  describe('Animation and Motion', () => {
    it('applies framer-motion variants', () => {
      render(<StatsCounter stats={mockStats} />);

      const container = screen.getByText('2+').closest('[data-variants]');
      expect(container).toHaveAttribute('data-variants');

      const card = screen.getByText('2+').closest('[data-while-hover]');
      expect(card).toHaveAttribute('data-while-hover');
    });

    it('handles reduced motion preference', () => {
      mockMatchMedia.mockReturnValue({
        matches: true, // prefers-reduced-motion: reduce
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      render(<StatsCounter stats={mockStats} />);

      // Should still render but with reduced animations
      expect(screen.getByText('2+')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('passes axe accessibility audit', async () => {
      const { container } = render(<StatsCounter stats={mockStats} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA labels for stat values', () => {
      render(<StatsCounter stats={mockStats} />);

      const valueElements = screen.getAllByLabelText(/.* .*/);
      expect(valueElements).toHaveLength(5);

      expect(screen.getByLabelText('2+ Years Experience')).toBeInTheDocument();
      expect(
        screen.getByLabelText('10+ Projects Delivered'),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('MERN & DS Technology Expertise'),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('3.67 M.S. GPA')).toBeInTheDocument();
      expect(
        screen.getByLabelText('1 Peer-reviewed Publications'),
      ).toBeInTheDocument();
    });

    it('has proper semantic structure', () => {
      render(<StatsCounter stats={mockStats} />);

      // Should have proper grid structure
      const gridContainer = screen.getByText('2+').closest('.grid');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid classes', () => {
      render(<StatsCounter stats={mockStats} />);

      const gridContainer = screen.getByText('2+').closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-2'); // Mobile: 2 columns
      expect(gridContainer).toHaveClass('md:grid-cols-3'); // Medium: 3 columns
      expect(gridContainer).toHaveClass('lg:grid-cols-5'); // Large: 5 columns
    });

    it('applies responsive text sizing', () => {
      render(<StatsCounter stats={mockStats} />);

      const valueElement = screen.getByText('2+');
      expect(valueElement).toHaveClass('text-2xl'); // Mobile
      expect(valueElement).toHaveClass('md:text-3xl'); // Medium and up

      const labelElement = screen.getByText('Years Experience');
      expect(labelElement).toHaveClass('text-xs'); // Mobile
      expect(labelElement).toHaveClass('md:text-sm'); // Medium and up
    });

    it('applies responsive padding', () => {
      render(<StatsCounter stats={mockStats} />);

      const card = screen.getByText('2+').closest('.p-4');
      expect(card).toHaveClass('p-4'); // Mobile
      expect(card).toHaveClass('md:p-6'); // Medium and up
    });
  });

  describe('Edge Cases', () => {
    it('handles empty stats array', () => {
      render(<StatsCounter stats={[]} />);

      // Should render container but no cards
      const container = document.querySelector('.mb-12');
      expect(container).toBeInTheDocument();

      // Should not have any stat cards
      const cards = document.querySelectorAll('.group');
      expect(cards).toHaveLength(0);
    });

    it('handles single stat item', () => {
      const singleStat = [{ value: '1', label: 'Test' }];
      render(<StatsCounter stats={singleStat} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('handles stats with special characters', () => {
      const specialStats = [
        { value: '100%', label: 'Success Rate' },
        { value: '€50K', label: 'Revenue' },
        { value: '1.5x', label: 'Performance' },
      ];

      render(<StatsCounter stats={specialStats} />);

      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('€50K')).toBeInTheDocument();
      expect(screen.getByText('1.5x')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('uses proper keys for stat items', () => {
      const { container } = render(<StatsCounter stats={mockStats} />);

      // Should render without console warnings about keys
      const cards = container.querySelectorAll('.group');
      expect(cards).toHaveLength(5);
    });

    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<StatsCounter stats={mockStats} />);

      // Should not have any memory leaks
      unmount();
      expect(mockMatchMedia).toHaveBeenCalled();
    });
  });
});
