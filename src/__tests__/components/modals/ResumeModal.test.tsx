import { render, screen, fireEvent } from '@testing-library/react';
import ResumeModal from '@/components/modals/ResumeModal';

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
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
  CardHeader: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
  CardTitle: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
}));

// Mock Chip component
jest.mock('@/components/ui/chip', () => ({
  Chip: ({ label, ...props }: { label: string }) => (
    <span {...props}>{label}</span>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <svg data-testid="icon-x" />,
  Download: () => <svg data-testid="icon-download" />,
  ExternalLink: () => <svg data-testid="icon-external-link" />,
  MapPin: () => <svg data-testid="icon-mappin" />,
  Mail: () => <svg data-testid="icon-mail" />,
  Globe: () => <svg data-testid="icon-globe" />,
  User: () => <svg data-testid="icon-user" />,
  Award: () => <svg data-testid="icon-award" />,
  Briefcase: () => <svg data-testid="icon-briefcase" />,
  GraduationCap: () => <svg data-testid="icon-graduation-cap" />,
}));

// Mock the resume data
jest.mock('@/data/resume', () => ({
  getAllResumes: () => [
    {
      id: 'sde',
      title: 'Software Engineer Resume',
      filename: 'Aditya_Gambhir_SDE.pdf',
      downloadName: 'Aditya_Gambhir_Software_Engineer_Resume.pdf',
      description: 'Test description',
      highlights: ['Test highlight'],
      targetAudience: 'Software Engineering roles',
      lastUpdated: '2024-12-08',
      fileSize: '2.1 MB',
      type: 'sde',
    },
  ],
}));

// Mock the about data
jest.mock('@/data/about', () => ({
  aboutData: {
    hero: {
      name: 'Aditya Gambhir',
    },
    professionalSummary: {
      description: 'Test professional summary',
    },
    dualExpertise: {
      dataScientist: {
        title: 'Data Scientist',
        achievements: ['Data science achievement'],
      },
      softwareEngineer: {
        title: 'Software Engineer',
        achievements: ['Software engineering achievement'],
      },
    },
    skillsMatrix: [
      {
        category: 'Languages',
        items: ['JavaScript', 'TypeScript'],
      },
      {
        category: 'Frameworks',
        items: ['React', 'Node.js'],
      },
    ],
    experience: [
      {
        company: 'Test Company',
        role: 'Test Role',
        period: 'Jan 2023 - Dec 2023',
        bullets: ['Test bullet point'],
      },
    ],
    education: [
      {
        degree: 'Test Degree',
        school: 'Test School',
        gpa: '3.8',
        courses: ['Test Course'],
      },
    ],
  },
}));

// Mock document.createElement globally at the top
const mockClick = jest.fn();
const mockLink = {
  href: '',
  download: '',
  click: mockClick,
  style: {},
  appendChild: jest.fn(),
  removeChild: jest.fn(),
};

// Mock createElement more robustly
const originalCreateElement = document.createElement;
beforeAll(() => {
  Object.defineProperty(document, 'createElement', {
    writable: true,
    value: jest.fn((tagName: string) => {
      if (tagName === 'a') {
        return mockLink;
      }
      return originalCreateElement.call(document, tagName);
    }),
  });
});

afterAll(() => {
  Object.defineProperty(document, 'createElement', {
    writable: true,
    value: originalCreateElement,
  });
});

describe('ResumeModal', () => {
  const mockOnClose = jest.fn();
  const mockSelectedResume = {
    id: 'sde',
    title: 'Software Engineer Resume',
    filename: 'Aditya_Gambhir_SDE.pdf',
    downloadName: 'Aditya_Gambhir_Software_Engineer_Resume.pdf',
    description: 'Test description',
    highlights: ['Test highlight'],
    targetAudience: 'Software Engineering roles',
    lastUpdated: '2024-12-08',
    fileSize: '2.1 MB',
    type: 'sde' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockClick.mockClear();
  });

  it('renders modal when open', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    expect(screen.getByText('Resume Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Aditya Gambhir')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /close modal/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('download-resume-btn')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ResumeModal
        isOpen={false}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    expect(screen.queryByText('Resume Portfolio')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('switches between content and preview views', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    // Should start in content view
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('PDF Preview')).toBeInTheDocument();

    // Switch to preview
    fireEvent.click(screen.getByText('PDF Preview'));
    expect(screen.queryByText('Aditya Gambhir')).not.toBeInTheDocument();

    // Switch back to content
    fireEvent.click(screen.getByText('Content'));
    expect(screen.getByText('Aditya Gambhir')).toBeInTheDocument();
  });

  it('renders condensed content sections', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    // Check for section headings
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
    expect(screen.getByText('Core Skills')).toBeInTheDocument();
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
  });

  it('displays skills based on resume type', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    // Should show SDE skills
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('triggers download when download button is clicked', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    const downloadButton = screen.getByTestId('download-resume-btn');
    fireEvent.click(downloadButton);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe('/Aditya_Gambhir_SDE.pdf');
    expect(mockLink.download).toBe(
      'Aditya_Gambhir_Software_Engineer_Resume.pdf',
    );
    expect(mockClick).toHaveBeenCalled();
  });

  it('triggers print when print button is clicked', () => {
    const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});

    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    const printButton = screen.getByText('Print');
    fireEvent.click(printButton);

    expect(printSpy).toHaveBeenCalled();

    printSpy.mockRestore();
  });

  it('displays resume metadata correctly', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    expect(screen.getByText(/Software Engineering roles/)).toBeInTheDocument();
    expect(screen.getByText(/2\.1 MB/)).toBeInTheDocument();
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });

  it('has proper scrollable container classes', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    const scrollContainer = document.querySelector(
      '.overflow-y-auto.scrollbar-thin',
    );
    expect(scrollContainer).toBeInTheDocument();
  });

  it('has print-specific CSS classes', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    expect(document.querySelector('.resume-modal-content')).toBeInTheDocument();
    expect(document.querySelector('.resume-content')).toBeInTheDocument();
    expect(document.querySelector('.no-print')).toBeInTheDocument();
  });
});
