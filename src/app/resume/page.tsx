// app/resume/page.tsx
import { Metadata } from 'next';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  title: 'Resume',
  description:
    "Download Aditya Gambhir's professional resume - Software Engineer and Data Science versions available in PDF format. 5+ years of experience in full-stack development and machine learning.",
  keywords: [
    'Aditya Gambhir Resume',
    'Software Engineer Resume',
    'Data Science Resume',
    'CV Download',
    'PDF Resume',
    'MERN Stack Developer',
  ],
  authors: [{ name: 'Aditya Gambhir' }],
  openGraph: {
    title: 'Resume | Aditya Gambhir',
    description:
      "Download Aditya Gambhir's professional resume - Software Engineer and Data Science versions available in PDF format.",
    url: 'https://aditya-gambhir-portfolio.vercel.app/resume',
    siteName: 'Aditya Gambhir Portfolio',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aditya Gambhir Resume Download',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Aditya Gambhir',
    description: "Download Aditya Gambhir's professional resume in PDF format.",
    images: ['/og-default.png'],
  },
};

// Resume data for better maintainability
const resumeData = [
  {
    id: 'sde',
    title: 'Software Engineer Resume',
    filename: 'Aditya_Gambhir_SDE.pdf',
    description: 'Focused on full-stack development and MERN stack projects',
  },
  {
    id: 'ds',
    title: 'Data Science Resume',
    filename: 'Aditya_Gambhir_DS.pdf',
    description: 'Highlighting machine learning and data analysis experience',
  },
] as const;

export default function ResumePage() {
  return (
    <main className="page-layout">
      {/* Header Section */}
      <header className="page-header">
        <h1 className="heading-page">Resume Downloads</h1>
        <p className="text-hero max-w-2xl mx-auto">
          Choose from my specialized resumes tailored for different career paths
        </p>
      </header>

      {/* Resume Downloads Section */}
      <section aria-labelledby="downloads-heading" className="content-section">
        <h2 id="downloads-heading" className="sr-only-heading">
          Available Resume Downloads
        </h2>
        <div className="grid-resume">
          {resumeData.map((resume) => (
            <article key={resume.id} className="article-card">
              <h3 className="heading-card mb-2">{resume.title}</h3>
              <p className="text-muted mb-4">{resume.description}</p>
              <a
                href={`/${resume.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200"
                aria-label={`Download ${resume.title} PDF`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </a>
            </article>
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
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Feel free to reach out if you have any questions or would like to
          discuss opportunities.
        </p>
      </section>
    </main>
  );
}
