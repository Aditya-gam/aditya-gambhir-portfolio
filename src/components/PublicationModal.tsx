'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Publication {
  readonly id: string;
  readonly title: string;
  readonly journal: string;
  readonly year: string;
  readonly url: string;
  readonly abstract: string;
}

interface PublicationModalProps {
  readonly publication: Publication | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function PublicationModal({
  publication,
  isOpen,
  onClose,
}: PublicationModalProps) {
  if (!publication) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleExternalLinkClick = () => {
    window.open(publication.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
        >
          <motion.div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Card className="shadow-xl">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-bold leading-tight mb-2">
                    {publication.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {publication.journal} • {publication.year}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="shrink-0 p-2 h-auto"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Abstract
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {publication.abstract}
                  </p>
                </div>
                <div className="flex justify-end pt-4 border-t">
                  <Button
                    onClick={handleExternalLinkClick}
                    className="flex items-center gap-2"
                  >
                    Read Full Paper
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
