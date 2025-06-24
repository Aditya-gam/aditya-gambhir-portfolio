import { motion } from 'framer-motion';

interface AboutCTAProps {
  resumes: {
    ds: string;
    sde: string;
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function AboutCTA({ resumes }: AboutCTAProps) {
  return (
    <motion.section
      className="text-center"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-6">Ready to Collaborate?</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Download my resume to learn more about my experience, or get in touch to
        discuss how we can work together.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={resumes.ds}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Data Science Resume
        </a>
        <a
          href={resumes.sde}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center justify-center px-6 py-3 border border-indigo-400 text-indigo-400 font-medium rounded-lg hover:bg-indigo-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Software Engineer Resume
        </a>
      </div>
    </motion.section>
  );
}
