import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, MessageSquare } from 'lucide-react';
import { UI_COPY } from '@/data/ui';

interface AboutCTAProps {
  onContactClick: () => void;
}

export default function AboutCTA({ onContactClick }: Readonly<AboutCTAProps>) {
  return (
    <motion.section
      className="card-highlight text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6">{UI_COPY.aboutCTA.title}</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        {UI_COPY.aboutCTA.description}
      </p>

      <div className="cta-buttons">
        <Link
          href="/resume"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
        >
          <FileText className="w-4 h-4 mr-2" />
          {UI_COPY.aboutCTA.resumeButton}
        </Link>
        <button
          onClick={onContactClick}
          className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          {UI_COPY.aboutCTA.contactButton}
        </button>
      </div>
    </motion.section>
  );
}
