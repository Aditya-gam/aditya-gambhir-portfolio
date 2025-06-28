import { render, screen } from '@testing-library/react';
import AboutGrid from '@/components/about/AboutGrid';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    className,
    width,
    height,
    // Filter out Next.js specific props
    priority: _priority,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    sizes: _sizes,
    ...props
  }: {
    src: string;
    alt: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
    placeholder?: string;
    blurDataURL?: string;
    sizes?: string;
    [key: string]: unknown;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
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

describe('AboutGrid Component', () => {
  const defaultProps = {
    name: 'Aditya Gambhir',
    title: 'Full-Stack Developer & AI Enthusiast',
    description:
      'M.S. Computational Data Science graduate transforming cutting-edge ML.',
    image: {
      src: '/headshot1.webp',
      alt: 'Aditya Gambhir',
    },
  };

  it('renders with default props', () => {
    render(<AboutGrid {...defaultProps} />);

    expect(screen.getByText('Aditya Gambhir')).toBeInTheDocument();
    expect(
      screen.getByText('Full-Stack Developer & AI Enthusiast'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'M.S. Computational Data Science graduate transforming cutting-edge ML.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the image with correct attributes', () => {
    render(<AboutGrid {...defaultProps} />);

    const image = screen.getByAltText('Aditya Gambhir');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/headshot1.webp');
    expect(image).toHaveAttribute('alt', 'Aditya Gambhir');
  });

  it('applies rounded image variant by default', () => {
    render(<AboutGrid {...defaultProps} />);

    const image = screen.getByAltText('Aditya Gambhir');
    expect(image).toHaveClass('rounded-full');
  });

  it('applies rounded-square image variant when specified', () => {
    render(<AboutGrid {...defaultProps} imageVariant="rounded-square" />);

    const image = screen.getByAltText('Aditya Gambhir');
    expect(image).toHaveClass('rounded-2xl');
    expect(image).not.toHaveClass('rounded-full');
  });

  it('renders children content when provided', () => {
    render(
      <AboutGrid {...defaultProps}>
        <div data-testid="child-content">Child Content</div>
      </AboutGrid>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AboutGrid {...defaultProps} className="custom-class" />);

    const section = screen.getByText('Aditya Gambhir').closest('section');
    expect(section).toHaveClass('custom-class');
  });

  it('applies correct grid layout classes', () => {
    render(<AboutGrid {...defaultProps} />);

    const gridContainer = document.querySelector('.grid.md\\:grid-cols-5');
    expect(gridContainer).toBeInTheDocument();
  });

  it('applies correct responsive text alignment', () => {
    render(<AboutGrid {...defaultProps} />);

    const contentDiv = screen
      .getByText('Full-Stack Developer & AI Enthusiast')
      .closest('div');
    expect(contentDiv).toHaveClass('text-center');
    expect(contentDiv).toHaveClass('md:text-left');
  });

  it('applies gradient text to name', () => {
    render(<AboutGrid {...defaultProps} />);

    const nameElement = screen.getByText('Aditya Gambhir');
    expect(nameElement).toHaveClass('bg-gradient-to-r');
    expect(nameElement).toHaveClass('from-indigo-400');
    expect(nameElement).toHaveClass('to-violet-400');
    expect(nameElement).toHaveClass('bg-clip-text');
    expect(nameElement).toHaveClass('text-transparent');
  });

  it('applies muted text to title and description', () => {
    render(<AboutGrid {...defaultProps} />);

    const titleElement = screen.getByText(
      'Full-Stack Developer & AI Enthusiast',
    );
    const descriptionElement = screen.getByText(
      'M.S. Computational Data Science graduate transforming cutting-edge ML.',
    );

    expect(titleElement).toHaveClass('text-muted-foreground');
    expect(descriptionElement).toHaveClass('text-muted-foreground');
  });

  it('applies correct image styling', () => {
    render(<AboutGrid {...defaultProps} />);

    const image = screen.getByAltText('Aditya Gambhir');
    expect(image).toHaveClass('object-cover');
    expect(image).toHaveClass('shadow-lg');
    expect(image).toHaveClass('shadow-indigo-500/20');
  });
});
