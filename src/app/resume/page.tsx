// app/resume/page.tsx
import { Metadata } from 'next';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumePreviewCard from '@/components/ResumePreviewCard';
import { getAllResumes } from '@/data/resume';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  title: 'Resume',
  description:
    "View and download Aditya Gambhir's professional resumes - Software Engineer and Data Science versions available with interactive previews. 2+ years of experience in full-stack development and machine learning.",
  keywords: [
    'Aditya Gambhir Resume',
    'Software Engineer Resume',
    'Data Science Resume',
    'CV Download',
    'PDF Resume',
    'MERN Stack Developer',
    'Machine Learning Engineer',
    'Resume Preview',
  ],
  authors: [{ name: 'Aditya Gambhir' }],
  openGraph: {
    title: 'Resume | Aditya Gambhir',
    description:
      "View and download Aditya Gambhir's professional resumes with interactive previews - Software Engineer and Data Science versions available.",
    url: 'https://aditya-gambhir-portfolio.vercel.app/resume',
    siteName: 'Aditya Gambhir Portfolio',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir Resume Preview and Download',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Aditya Gambhir',
    description:
      "View and download Aditya Gambhir's professional resumes with interactive previews.",
    images: ['/og-default.png'],
  },
};

export default function ResumePage() {
  const resumes = getAllResumes();

  return (
    <main className="page-layout">
      {/* Header Section */}
      <header className="page-header text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="heading-page">Resume Portfolio</h1>
        <p className="text-hero max-w-3xl mx-auto">
          Explore my professional journey through specialized resumes tailored
          for different career paths. Each resume is crafted to highlight
          relevant experience and skills for specific roles.
        </p>
      </header>

      {/* Stats Section */}
      <section className="content-section" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only-heading">
          Resume Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">2</div>
            <div className="text-sm text-muted-foreground">
              Specialized Resumes
            </div>
          </div>
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">Live</div>
            <div className="text-sm text-muted-foreground">PDF Previews</div>
          </div>
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">Instant</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </div>
        </div>
      </section>

      {/* Resume Previews Section */}
      <section
        className="content-section-lg"
        aria-labelledby="previews-heading"
      >
        <h2 id="previews-heading" className="heading-section text-center mb-12">
          Resume Previews
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {resumes.map((resume) => (
            <ResumePreviewCard
              key={resume.id}
              resume={resume}
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Quick Download Section */}
      <section
        className="content-section bg-accent/30 rounded-2xl p-8 text-center"
        aria-labelledby="quick-download-heading"
      >
        <h2 id="quick-download-heading" className="heading-section mb-4">
          Quick Download
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Need to download both resumes quickly? Use the buttons below for
          direct downloads without previewing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          {resumes.map((resume) => (
            <Button
              key={resume.id}
              asChild
              variant="outline"
              size="lg"
              className="flex-1 gap-2"
            >
              <a
                href={`/${resume.filename}`}
                download={resume.downloadName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                {resume.type.toUpperCase()} Resume
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section
        className="content-section text-center"
        aria-labelledby="info-heading"
      >
        <h2 id="info-heading" className="heading-section">
          Need More Information?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Have questions about my experience or want to discuss opportunities?
          I&apos;d love to connect and share more about my professional journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button asChild variant="default" size="lg" className="flex-1 gap-2">
            <a href="/about">
              <FileText className="w-4 h-4" />
              Learn More About Me
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1 gap-2">
            <a href="/projects">
              <Eye className="w-4 h-4" />
              View My Projects
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
