'use client';

import { useState, useRef } from 'react';
import {
  Download,
  ExternalLink,
  Calendar,
  FileText,
  Users,
  HardDrive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import type { ResumeData } from '@/data/resume';
import { cn } from '@/lib/utils';

interface ResumePreviewCardProps {
  readonly resume: ResumeData;
  readonly priority?: boolean;
  readonly className?: string;
}

export default function ResumePreviewCard({
  resume,
  priority = false,
  className = '',
}: ResumePreviewCardProps) {
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePreviewLoad = () => {
    setIsPreviewLoaded(true);
    setPreviewError(false);
  };

  const handlePreviewError = () => {
    setPreviewError(true);
    setIsPreviewLoaded(false);
  };

  const handleDownload = () => {
    // Track download analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', 'download', {
        event_category: 'resume',
        event_label: resume.id,
        file_name: resume.filename,
      });
    }

    // Create download link
    const link = document.createElement('a');
    link.href = `/${resume.filename}`;
    link.download = resume.downloadName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewFullscreen = () => {
    window.open(`/${resume.filename}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className={cn('resume-preview-card overflow-hidden', className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {resume.title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {resume.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span
              className={cn(
                'px-2 py-1 text-xs font-medium rounded-full',
                resume.type === 'sde'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
              )}
            >
              {resume.type.toUpperCase()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* PDF Preview */}
        <div className="pdf-preview-container">
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700">
            {!previewError ? (
              <>
                {!isPreviewLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Loading preview...</span>
                    </div>
                  </div>
                )}

                <iframe
                  ref={iframeRef}
                  src={`/${resume.filename}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                  title={`${resume.title} Preview`}
                  className={cn(
                    'w-full border-0 transition-opacity duration-300',
                    'h-[400px] md:h-[500px] lg:h-[600px]',
                    isPreviewLoaded ? 'opacity-100' : 'opacity-0',
                  )}
                  onLoad={handlePreviewLoad}
                  onError={handlePreviewError}
                  loading={priority ? 'eager' : 'lazy'}
                  sandbox="allow-same-origin"
                />
              </>
            ) : (
              <div className="h-[400px] md:h-[500px] lg:h-[600px] flex flex-col items-center justify-center text-center p-8">
                <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Preview Not Available
                </h3>
                <p className="text-muted-foreground text-sm mb-4 max-w-md">
                  PDF preview couldn&apos;t be loaded. You can still download
                  the full resume to view it.
                </p>
                <Button
                  variant="outline"
                  onClick={handleViewFullscreen}
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </Button>
              </div>
            )}
          </div>

          {!previewError && (
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>PDF Preview</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewFullscreen}
                className="h-auto p-1 gap-1 text-xs hover:text-primary"
              >
                <ExternalLink className="w-3 h-3" />
                Full Screen
              </Button>
            </div>
          )}
        </div>

        {/* Resume Highlights */}
        <div className="resume-highlights">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Key Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resume.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm bg-accent/50 rounded-md px-3 py-2"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Metadata */}
        <div className="resume-metadata">
          <h4 className="font-semibold text-sm mb-3">Resume Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <div>
                <div className="font-medium text-foreground">Target Roles</div>
                <div className="text-xs">{resume.targetAudience}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <div>
                <div className="font-medium text-foreground">Last Updated</div>
                <div className="text-xs">
                  {new Date(resume.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <HardDrive className="w-4 h-4" />
              <div>
                <div className="font-medium text-foreground">File Size</div>
                <div className="text-xs">{resume.fileSize}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="w-4 h-4" />
              <div>
                <div className="font-medium text-foreground">Format</div>
                <div className="text-xs">PDF Document</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleDownload}
          className="flex-1 gap-2 font-semibold"
          size="lg"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </Button>
        <Button
          variant="outline"
          onClick={handleViewFullscreen}
          className="flex-1 sm:flex-initial gap-2"
          size="lg"
        >
          <ExternalLink className="w-4 h-4" />
          View Full PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
