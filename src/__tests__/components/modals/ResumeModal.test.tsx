import { render, screen, fireEvent } from '@testing-library/react';
import ResumeModal from '@/components/modals/ResumeModal';

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

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

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
    expect(screen.getByText('12/8/2024')).toBeInTheDocument(); // Formatted date
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
