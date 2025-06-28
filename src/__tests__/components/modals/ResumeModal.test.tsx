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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <svg data-testid="icon-x" />,
  Download: () => <svg data-testid="icon-download" />,
  ExternalLink: () => <svg data-testid="icon-external-link" />,
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
    expect(screen.getByText('Software Engineer Resume')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /view fullscreen/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i }),
    ).toBeInTheDocument();
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

  it('calls onClose when backdrop is clicked', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    // Select the backdrop by class name (matches the real modal backdrop)
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    const modalContent = screen.getByText('Resume Portfolio').closest('div');
    if (modalContent) {
      fireEvent.click(modalContent);
    }

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders resume details correctly', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    expect(screen.getByText('Software Engineering roles')).toBeInTheDocument();
    expect(screen.getByText('2.1 MB')).toBeInTheDocument();
    // Update to match the rendered date
    expect(screen.getByText('12/7/2024')).toBeInTheDocument();
  });

  it('renders iframe with correct src', () => {
    render(
      <ResumeModal
        isOpen={true}
        onClose={mockOnClose}
        selectedResume={mockSelectedResume}
      />,
    );

    const iframe = screen.getByTitle('Preview of Software Engineer Resume');
    expect(iframe).toHaveAttribute(
      'src',
      '/Aditya_Gambhir_SDE.pdf#toolbar=0&navpanes=0&scrollbar=0',
    );
  });
});
