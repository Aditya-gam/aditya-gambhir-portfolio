'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PublicationModal from '@/components/PublicationModal';
import { UI_COPY } from '@/data/ui';

interface Publication {
  readonly id: string;
  readonly title: string;
  readonly journal: string;
  readonly year: string;
  readonly url: string;
  readonly abstract: string;
}

interface PublicationsProps {
  readonly publications: readonly Publication[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function Publications({ publications }: PublicationsProps) {
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublicationClick = (publication: Publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null);
  };

  const publicationCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -2, scale: 1.01 },
  };

  return (
    <>
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">
          {UI_COPY.publications.heading}
        </h2>
        <div className="space-y-4">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              variants={publicationCardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <button
                className="w-full text-left"
                onClick={() => handlePublicationClick(publication)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePublicationClick(publication);
                  }
                }}
                aria-label={`View details for ${publication.title}`}
              >
                <Card className="p-6 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2 flex items-center group">
                        &ldquo;{publication.title}&rdquo;
                        <ExternalLink className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {publication.journal} • {publication.year}
                      </p>
                    </div>
                    <p className="text-indigo-400 text-sm italic">
                      {UI_COPY.publications.callout}
                    </p>
                  </CardContent>
                </Card>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <PublicationModal
        publication={selectedPublication}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
