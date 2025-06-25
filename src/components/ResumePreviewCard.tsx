'use client';
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
  readonly className?: string;
}

export default function ResumePreviewCard({
  resume,
  className = '',
}: ResumePreviewCardProps) {
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
        {/* PDF Preview Card */}
        <div className="pdf-preview-container">
          <section
            className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            aria-label={`${resume.title} preview and actions`}
          >
            <div className="h-[400px] md:h-[500px] lg:h-[600px] flex flex-col items-center justify-center text-center p-8">
              {/* PDF Icon and Visual */}
              <div className="relative mb-6">
                <div className="w-24 h-32 bg-white dark:bg-gray-100 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-300 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <FileText className="w-12 h-12 text-red-600 mb-2" />
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-800">
                    PDF
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                {/* Paper stack effect */}
                <div className="absolute -bottom-1 -right-1 w-24 h-32 bg-gray-200 dark:bg-gray-300 rounded-lg -z-10 transform rotate-2" />
                <div className="absolute -bottom-2 -right-2 w-24 h-32 bg-gray-300 dark:bg-gray-400 rounded-lg -z-20 transform rotate-4" />
              </div>

              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {resume.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Choose an action below to view or download the resume.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <Button
                  variant="default"
                  onClick={handleViewFullscreen}
                  className="flex-1 gap-2 font-medium"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>

              {/* File Info */}
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3" />
                  {resume.fileSize}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated {new Date(resume.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </section>
        </div>

        {/* Resume Highlights */}
        <div className="resume-highlights">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Key Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resume.highlights.map((highlight) => (
              <div
                key={highlight}
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
