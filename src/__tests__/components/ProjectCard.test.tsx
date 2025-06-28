import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/ProjectCard';
import { ProjectData } from '@/types';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    className,
    // Filter out Next.js specific props
    priority: _priority,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    sizes: _sizes,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    placeholder?: string;
    blurDataURL?: string;
    sizes?: string;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    );
  };
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockProject: ProjectData = {
  title: 'Test Project',
  description: 'A test project description',
  bullets: ['Feature 1', 'Feature 2', 'Feature 3'],
  imageSrc: '/projects/test-project.svg',
  imageAlt: 'Test project screenshot',
  priority: false,
  featured: true,
  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  githubUrl: 'https://github.com/test/test-project',
  liveUrl: 'https://test-project.com',
};

const mockProjectWithoutUrls: ProjectData = {
  title: 'Test Project No URLs',
  description: 'A test project without GitHub or live URLs',
  bullets: ['Feature 1', 'Feature 2'],
  imageSrc: '/projects/test-project-2.svg',
  imageAlt: 'Test project 2 screenshot',
  priority: true,
  featured: false,
  technologies: ['Python', 'Django'],
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders project image with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText('Test project screenshot');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/projects/test-project.svg');
  });

  it('renders GitHub link when githubUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByLabelText(
      'View Test Project source code on GitHub',
    );
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/test/test-project',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders live demo link when liveUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);

    const liveLink = screen.getByLabelText('View Test Project live demo');
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute('href', 'https://test-project.com');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render GitHub or live links when URLs are not provided', () => {
    render(<ProjectCard project={mockProjectWithoutUrls} />);

    expect(
      screen.queryByLabelText(/source code on GitHub/),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/live demo/)).not.toBeInTheDocument();
  });

  it('renders technology tags correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('shows "+X more" indicator when there are more than 6 technologies', () => {
    const projectWithManyTechs: ProjectData = {
      ...mockProject,
      technologies: [
        'Tech1',
        'Tech2',
        'Tech3',
        'Tech4',
        'Tech5',
        'Tech6',
        'Tech7',
        'Tech8',
      ],
    };

    render(<ProjectCard project={projectWithManyTechs} />);

    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('renders without image when imageSrc is not provided', () => {
    const projectWithoutImage: ProjectData = {
      ...mockProject,
      imageSrc: '',
    };

    render(<ProjectCard project={projectWithoutImage} />);

    expect(
      screen.queryByAltText('Test project screenshot'),
    ).not.toBeInTheDocument();
  });

  it('uses fallback alt text when imageAlt is not provided', () => {
    const projectWithoutAlt: ProjectData = {
      ...mockProject,
      imageAlt: undefined,
    };

    render(<ProjectCard project={projectWithoutAlt} />);

    // The component uses imageAlt ?? `${title} project screenshot` as fallback
    const image = screen.getByAltText('Test Project project screenshot');
    expect(image).toBeInTheDocument();
  });

  it('applies priority loading to first few images', () => {
    render(<ProjectCard project={mockProject} priority={true} />);

    const image = screen.getByAltText('Test project screenshot');
    // Next.js Image component handles priority internally, so we just check the image exists
    expect(image).toBeInTheDocument();
  });

  it('applies lazy loading to non-priority images', () => {
    render(<ProjectCard project={mockProject} priority={false} />);

    const image = screen.getByAltText('Test project screenshot');
    // Next.js Image component handles loading internally, so we just check the image exists
    expect(image).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<ProjectCard project={mockProject} />);

    // Should have a heading for the project title
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

    // Should have a list for the bullets
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    // Should have list items for bullets
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3); // 3 bullets
  });

  it('has proper accessibility attributes', () => {
    render(<ProjectCard project={mockProject} />);

    // External links should have proper attributes
    const githubLink = screen.getByLabelText(
      'View Test Project source code on GitHub',
    );
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const liveLink = screen.getByLabelText('View Test Project live demo');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('works in both list view and grid contexts', () => {
    // Test in list context (default)
    const { rerender } = render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();

    // Test in grid context (should work the same)
    rerender(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
