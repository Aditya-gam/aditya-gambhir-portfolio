import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  MapPin,
  Mail,
  Globe,
  User,
  Award,
  Briefcase,
  GraduationCap,
  Brain,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { getAllResumes, getResumeModalContent } from '@/data/resume';
import { SITE_CONFIG } from '@/data/metadata';
import type { ResumeData } from '@/data/resume';

interface ResumeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedResume?: ResumeData;
}

/**
 * Enhanced ResumeModal component with fully dynamic content based on resume type
 * All sections adapt to show DS-focused or SDE-focused content
 */
export default function ResumeModal({
  isOpen,
  onClose,
  selectedResume,
}: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'content' | 'preview'>(
    'content',
  );
  const resumes = getAllResumes();

  // Internal state to allow switching between different resumes while the modal is open
  const [displayResume, setDisplayResume] = useState<ResumeData>(
    selectedResume || resumes[0],
  );

  // Sync internal state when parent selectedResume prop changes
  useEffect(() => {
    if (selectedResume && selectedResume.id !== displayResume.id) {
      setDisplayResume(selectedResume);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResume]);

  // Handle escape key and focus management
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
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
  }, [isOpen, activeView]);

  const handleDownload = (resume: ResumeData) => {
    const link = document.createElement('a');
    link.href = `/${resume.filename}`;
    link.download = resume.downloadName;
    link.click();
  };

  const handleViewFullscreen = (resume: ResumeData) => {
    window.open(`/${resume.filename}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!isOpen) return null;

  const dynamicContent = getResumeModalContent(displayResume);

  // Fallbacks to ensure backward compatibility with mocks/tests that may not include
  // the newly added `name` and `location` fields
  const candidateName = displayResume.name ?? SITE_CONFIG.name;
  const candidateLocation = displayResume.location ?? 'Riverside, CA';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className="w-full max-w-5xl max-h-[90vh] overflow-hidden bg-background rounded-lg shadow-2xl resume-modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b no-print">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <dynamicContent.primaryIcon
                  className={`h-8 w-8 ${dynamicContent.iconColor}`}
                />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Resume Portfolio
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Currently viewing:{' '}
                    <span className="font-medium text-primary">
                      {dynamicContent.title}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeView === 'content' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveView('content')}
                >
                  Content
                </Button>
                <Button
                  variant={activeView === 'preview' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveView('preview')}
                >
                  PDF Preview
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrint}
                className="gap-2"
              >
                <Award className="h-4 w-4" />
                Print
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close modal"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-thin">
            <CardContent className="p-6">
              {activeView === 'content' ? (
                <div className="space-y-8 resume-content">
                  {/* Header Section */}
                  <section className="text-center border-b pb-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                      {candidateName}
                    </h1>
                    <h2 className="text-xl text-muted-foreground mb-4">
                      {dynamicContent.title}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {candidateLocation}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {SITE_CONFIG.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Portfolio Website
                      </div>
                    </div>
                  </section>

                  {/* Professional Summary */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">
                        Professional Summary
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {dynamicContent.professionalSummary}
                    </p>
                    <div
                      className={`mt-3 p-3 ${dynamicContent.accentClasses.bg} rounded-lg border-l-4 ${dynamicContent.accentClasses.border}`}
                    >
                      <p
                        className={`text-sm font-medium ${dynamicContent.accentClasses.text}`}
                      >
                        &ldquo;{dynamicContent.quote}&rdquo;
                      </p>
                    </div>
                  </section>

                  {/* Core Skills Matrix */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Core Skills</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dynamicContent.relevantSkills.map((skillCategory) => (
                        <Card key={skillCategory.category} className="p-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <span
                              className={`h-2 w-2 ${dynamicContent.accentClasses.dot} rounded-full`}
                            />
                            {skillCategory.category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skillCategory.items.slice(0, 8).map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                variant="secondary"
                                size="sm"
                              />
                            ))}
                            {skillCategory.items.length > 8 && (
                              <Chip
                                label={`+${skillCategory.items.length - 8} more`}
                                variant="outline"
                                size="sm"
                              />
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* Relevant Experience */}
                  {dynamicContent.relevantExperience.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">
                          Experience Highlights
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {dynamicContent.relevantExperience.map((exp, index) => (
                          <Card
                            key={`${exp.company}-${exp.role}-${exp.period}`}
                            className={`p-4 border-l-4 ${dynamicContent.accentClasses.border}`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                              <div>
                                <h4 className="font-semibold">{exp.role}</h4>
                                <p className="text-primary font-medium">
                                  {exp.company}
                                </p>
                              </div>
                              <div
                                className={`text-right ${dynamicContent.accentClasses.badge} px-2 py-1 rounded text-sm font-medium`}
                              >
                                {exp.period}
                              </div>
                            </div>
                            <ul className="space-y-2">
                              {exp.bullets.map((bullet, bulletIndex) => (
                                <li
                                  key={bullet}
                                  className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                                >
                                  <span
                                    className={`h-1.5 w-1.5 ${dynamicContent.accentClasses.dot} rounded-full mt-2 flex-shrink-0`}
                                  />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </Card>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Key Achievements */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">
                        Key Achievements
                      </h3>
                    </div>
                    <Card className="p-4">
                      <ul className="space-y-2">
                        {dynamicContent.achievements.map(
                          (achievement, index) => (
                            <li
                              key={achievement}
                              className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                            >
                              <span
                                className={`h-1.5 w-1.5 ${dynamicContent.accentClasses.dot} rounded-full mt-2 flex-shrink-0`}
                              />
                              {achievement}
                            </li>
                          ),
                        )}
                      </ul>
                    </Card>
                  </section>

                  {/* Education */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Education</h3>
                    </div>
                    <div className="space-y-4">
                      {dynamicContent.relevantEducation.map((edu, index) => (
                        <Card
                          key={`${edu.degree}-${edu.school}`}
                          className={`p-4 border-l-4 ${dynamicContent.accentClasses.border}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{edu.degree}</h4>
                              <p className="text-primary font-medium">
                                {edu.school}
                              </p>
                            </div>
                            <div
                              className={`text-right ${dynamicContent.accentClasses.badge} px-2 py-1 rounded text-sm font-medium`}
                            >
                              GPA: {edu.gpa}
                            </div>
                          </div>
                          {edu.courses.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">
                                Relevant Coursework
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {edu.courses.map((course) => (
                                  <Chip
                                    key={course}
                                    label={course}
                                    variant="outline"
                                    size="sm"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* Relevant Certifications */}
                  {dynamicContent.certifications.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">
                          Relevant Certifications
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dynamicContent.certifications
                          .slice(0, 6)
                          .map((cert, index) => (
                            <Card key={cert.title} className="p-3">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-sm leading-tight">
                                  {cert.title}
                                </h4>
                                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                                  {cert.year}
                                </span>
                              </div>
                              <p className="text-xs text-primary font-medium mb-1">
                                {cert.provider}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {cert.description ??
                                  'Professional certification'}
                              </p>
                            </Card>
                          ))}
                      </div>
                    </section>
                  )}

                  {/* Resume Switching */}
                  {resumes.length > 1 && (
                    <div className="mt-8 space-y-3">
                      <h4 className="text-sm font-medium">
                        Switch Resume Type
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {resumes.map((resume) => {
                          const isActive = displayResume.id === resume.id;
                          const conditionalClasses = isActive
                            ? `${dynamicContent.accentClasses.borderFull} ${dynamicContent.accentClasses.bg} shadow-md`
                            : 'border-transparent';

                          return (
                            <Card
                              key={resume.id}
                              className={`cursor-pointer transition-all duration-200 border ${conditionalClasses} hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                              onClick={() => setDisplayResume(resume)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setDisplayResume(resume);
                                }
                              }}
                              tabIndex={0}
                              aria-label={`Switch to ${resume.title}`}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {resume.type === 'ds' ? (
                                      <Brain className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                      <Code className="h-4 w-4 text-blue-600" />
                                    )}
                                    <div>
                                      <h5 className="font-medium text-sm">
                                        {resume.title}
                                      </h5>
                                      <p className="text-xs text-muted-foreground">
                                        {resume.type === 'ds'
                                          ? 'ML & Data Science Focus'
                                          : 'Full-Stack Development Focus'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {resume.fileSize}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* PDF Preview */
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src={`/${displayResume.filename}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full"
                      title={`Preview of ${displayResume.title}`}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </div>

          {/* Modal Footer */}
          <div className="border-t p-4 no-print">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => handleDownload(displayResume)}
                className="flex-1 gap-2"
                size="lg"
                data-testid="download-resume-btn"
              >
                <Download className="w-4 h-4" />
                Download {displayResume.title}
              </Button>
              <Button
                onClick={() => handleViewFullscreen(displayResume)}
                variant="outline"
                className="flex-1 gap-2"
                size="lg"
              >
                <ExternalLink className="w-4 h-4" />
                View Fullscreen
              </Button>
            </div>

            {/* Resume Metadata */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>
                {displayResume.targetAudience} • {displayResume.fileSize} • Last
                updated: {formatDate(displayResume.lastUpdated)}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
