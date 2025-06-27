import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllResumes } from '@/data/resume';
import type { ResumeData } from '@/data/resume';

interface ResumeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedResume?: ResumeData;
}

/**
 * ResumeModal component provides a modal interface for viewing and downloading resumes
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to close the modal
 * @param selectedResume - Optional specific resume to display
 */
export default function ResumeModal({
  isOpen,
  onClose,
  selectedResume,
}: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const resumes = getAllResumes();
  const displayResume = selectedResume || resumes[0];

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  const handleDownload = (resume: ResumeData) => {
    const link = document.createElement('a');
    link.href = `/${resume.filename}`;
    link.download = resume.downloadName;
    link.click();
  };

  const handleViewFullscreen = (resume: ResumeData) => {
    window.open(`/${resume.filename}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold">
                Resume Portfolio
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close modal"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Resume Preview */}
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={`/${displayResume.filename}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full"
                    title={`Preview of ${displayResume.title}`}
                  />
                </div>
              </div>

              {/* Resume Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleViewFullscreen(displayResume)}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Fullscreen
                </Button>
                <Button
                  onClick={() => handleDownload(displayResume)}
                  variant="outline"
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>

              {/* Resume Selection */}
              {resumes.length > 1 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Choose Resume Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resumes.map((resume) => (
                      <Card
                        key={resume.id}
                        className={`cursor-pointer transition-all duration-200 hover:border-primary ${
                          displayResume.id === resume.id
                            ? 'border-primary bg-primary/5'
                            : ''
                        }`}
                        onClick={() => {
                          // This would need to be handled by parent component
                          // For now, we'll just close and reopen with new resume
                          onClose();
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{resume.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {resume.targetAudience}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {resume.fileSize}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume Metadata */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">Resume Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>{' '}
                    {displayResume.title}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target:</span>{' '}
                    {displayResume.targetAudience}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>{' '}
                    {displayResume.fileSize}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated:</span>{' '}
                    {new Date(displayResume.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
