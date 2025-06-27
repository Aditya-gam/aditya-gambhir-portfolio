import { render, screen } from '@testing-library/react';
import SkillsMatrix from '@/components/about/SkillsMatrix';

// Mock the Chip component
jest.mock('@/components/ui/chip', () => ({
  Chip: ({
    label,
    icon,
    'aria-label': ariaLabel,
    ...props
  }: {
    label: string;
    icon?: React.ReactNode;
    'aria-label'?: string;
    [key: string]: unknown;
  }) => (
    <div data-testid="chip" aria-label={ariaLabel} {...props}>
      {icon}
      {label}
    </div>
  ),
  chipVariants: jest.fn(),
}));

// Mock the skills data functions
jest.mock('@/data/skills', () => ({
  getSkillColors: jest.fn(),
  getSkillIcon: jest.fn((skill: string) => (skill === 'Python' ? '🐍' : '💻')),
  SkillCategory: {
    LANGUAGES: 'Languages',
    FRAMEWORKS: 'Frameworks',
    DATA_AI: 'Data / AI',
    CLOUD_DEVOPS: 'Cloud & DevOps',
    DATABASES: 'Databases',
    TOOLING: 'Tooling',
  },
}));

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
      <section className={className} data-framer-motion {...props}>
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

describe('SkillsMatrix Component', () => {
  const mockSkillsMatrix = [
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'TypeScript'],
    },
    {
      category: 'Frameworks',
      items: ['React', 'Node.js'],
    },
    {
      category: 'Data / AI',
      items: ['TensorFlow', 'Pandas'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Docker'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tooling',
      items: ['Git', 'GitHub Actions'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the skills matrix title', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);
    expect(screen.getByText('Skills Matrix')).toBeInTheDocument();
  });

  it('renders all skill categories in the icon grid', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    // Check that all categories are rendered (there will be duplicates, so use getAllByText)
    const languagesElements = screen.getAllByText('Languages');
    const frameworksElements = screen.getAllByText('Frameworks');
    const dataAiElements = screen.getAllByText('Data / AI');
    const cloudDevopsElements = screen.getAllByText('Cloud & DevOps');
    const databasesElements = screen.getAllByText('Databases');
    const toolingElements = screen.getAllByText('Tooling');

    expect(languagesElements.length).toBeGreaterThan(0);
    expect(frameworksElements.length).toBeGreaterThan(0);
    expect(dataAiElements.length).toBeGreaterThan(0);
    expect(cloudDevopsElements.length).toBeGreaterThan(0);
    expect(databasesElements.length).toBeGreaterThan(0);
    expect(toolingElements.length).toBeGreaterThan(0);
  });

  it('renders skill counts for each category', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    // Check for skill counts (there will be duplicates, so use getAllByText)
    const threeSkillsElements = screen.getAllByText('3 skills');
    const twoSkillsElements = screen.getAllByText('2 skills');

    expect(threeSkillsElements.length).toBeGreaterThan(0);
    expect(twoSkillsElements.length).toBeGreaterThan(0);
  });

  it('renders all individual skills with icons', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    // Check for skills in the detailed section
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('TensorFlow')).toBeInTheDocument();
    expect(screen.getByText('Pandas')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
  });

  it('applies correct accessibility attributes to skill chips', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    const pythonChip = screen.getByLabelText('Python - Languages skill');
    expect(pythonChip).toBeInTheDocument();

    const reactChip = screen.getByLabelText('React - Frameworks skill');
    expect(reactChip).toBeInTheDocument();
  });

  it('renders category icons in the detailed section', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    // Check for category icons (using the first skill's icon as category icon)
    const categoryIcons = screen.getAllByText('🐍'); // Python icon
    expect(categoryIcons.length).toBeGreaterThan(0);
  });

  it('applies correct grid layout classes', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    const iconGrid = screen.getByText('Skills Matrix').nextElementSibling;
    expect(iconGrid).toHaveClass('grid');
    expect(iconGrid).toHaveClass('grid-cols-2');
    expect(iconGrid).toHaveClass('sm:grid-cols-3');
    expect(iconGrid).toHaveClass('lg:grid-cols-4');
  });

  it('handles empty skills matrix gracefully', () => {
    render(<SkillsMatrix skillsMatrix={[]} />);

    expect(screen.getByText('Skills Matrix')).toBeInTheDocument();
    expect(screen.queryByText('skills')).not.toBeInTheDocument();
  });

  it('handles categories with empty items array', () => {
    const skillsMatrixWithEmpty = [
      {
        category: 'Languages',
        items: [],
      },
    ];

    render(<SkillsMatrix skillsMatrix={skillsMatrixWithEmpty} />);

    // Check that Languages appears (there will be duplicates)
    const languagesElements = screen.getAllByText('Languages');
    expect(languagesElements.length).toBeGreaterThan(0);

    expect(screen.getByText('0 skills')).toBeInTheDocument();
  });

  it('renders with proper motion animation attributes', () => {
    render(<SkillsMatrix skillsMatrix={mockSkillsMatrix} />);

    const section = screen.getByText('Skills Matrix').closest('section');
    expect(section).toHaveAttribute('data-framer-motion');
  });
});
