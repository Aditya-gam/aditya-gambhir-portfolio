// app/resume/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

// Modern Next.js 15: Export metadata for better SEO
export const metadata: Metadata = {
  title: 'Resume - Aditya Gambhir',
  description:
    "Download Aditya Gambhir's resume - Software Engineer and Data Science versions available in PDF format.",
  keywords: [
    'Aditya Gambhir Resume',
    'Software Engineer Resume',
    'Data Science Resume',
    'CV Download',
  ],
  authors: [{ name: 'Aditya Gambhir' }],
  openGraph: {
    title: 'Resume - Aditya Gambhir',
    description:
      "Download Aditya Gambhir's resume - Software Engineer and Data Science versions available in PDF format.",
    type: 'website',
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
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Resume Downloads
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose from my specialized resumes tailored for different career paths
        </p>
      </header>

      {/* Resume Downloads Section */}
      <section aria-labelledby="downloads-heading">
        <h2 id="downloads-heading" className="sr-only">
          Available Resume Downloads
        </h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {resumeData.map((resume) => (
            <article
              key={resume.id}
              className="group p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {resume.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {resume.description}
              </p>
              <a
                href={`/${resume.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 group-hover:bg-blue-700"
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
      <section className="mt-12 text-center" aria-labelledby="info-heading">
        <h2
          id="info-heading"
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
        >
          Need More Information?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          Feel free to reach out if you have any questions or would like to
          discuss opportunities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Go back to homepage"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Contact me"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
