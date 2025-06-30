import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import CertificateModal from '@/components/CertificateModal';
import { useCertificateModal } from '@/hooks/useCertificateModal';
import type { Certificate } from '@/types';
import { Calendar, Link } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { UI_COPY } from '@/data/ui';

interface CertificationsProps {
  readonly certifications: readonly Certificate[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function Certifications({
  certifications,
}: CertificationsProps) {
  const {
    isOpen,
    currentCertificate,
    currentIndex,
    openModal,
    closeModal,
    navigate,
  } = useCertificateModal(certifications);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    setIsAutoplayEnabled(!prefersReducedMotion);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoplayEnabled || isHovered || !scrollContainerRef.current) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    const cardWidth = 320 + 16; // min-w-80 (320px) + gap (16px)

    const autoScroll = () => {
      if (scrollContainer) {
        const maxScrollLeft =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScrollLeft = scrollContainer.scrollLeft;

        if (currentScrollLeft >= maxScrollLeft) {
          // Reset to beginning
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next card
          scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    };

    autoplayTimeoutRef.current = setTimeout(autoScroll, 3000); // 3 second intervals

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }
    };
  }, [isAutoplayEnabled, isHovered]);

  const pauseAutoplay = () => {
    setIsHovered(true);
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = pauseAutoplay;

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = pauseAutoplay;

  const handleBlur = () => {
    setIsHovered(false);
  };

  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      aria-labelledby="certifications-heading"
    >
      <h2
        id="certifications-heading"
        className="text-2xl font-bold mb-8 text-center"
      >
        {UI_COPY.certifications.heading}
      </h2>

      <section
        ref={scrollContainerRef}
        className="overflow-x-auto certificates-scroll"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Scrollable certifications container"
      >
        <ul
          className="flex gap-4 pb-4"
          style={{ minWidth: 'max-content' }}
          aria-label="Professional certifications"
        >
          {certifications.map((cert, index) => (
            <li key={cert.title}>
              <Card
                className="p-4 shadow-sm min-w-80 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-l-4 border-l-indigo-500"
                onClick={() => openModal(cert)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(cert);
                  }
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-label={`View ${cert.title} certificate`}
              >
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-foreground leading-tight flex-1 pr-2"
                        id={`cert-${index}-title`}
                      >
                        {cert.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Calendar
                          className="w-6 h-6 text-primary flex-shrink-0"
                          aria-hidden="true"
                        />
                        <time
                          className="ml-2 text-sm text-muted-foreground"
                          dateTime={`${cert.year}-${cert.month ?? '01'}`}
                        >
                          {cert.month} {cert.year}
                        </time>
                      </div>
                      <div className="flex items-center mt-1">
                        <Link
                          className="w-6 h-6 text-primary flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="ml-2">
                          <span className="font-medium">{cert.provider}</span>
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground italic line-clamp-2 mt-2">
                        {cert.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {cert.filePath && (
                        <div
                          className="w-6 h-6 text-indigo-500 flex-shrink-0"
                          title="Certificate available"
                          aria-label="Certificate document available"
                        >
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      )}
                      {cert.linkedinUrl && (
                        <div
                          className="w-6 h-6 text-blue-600 flex-shrink-0"
                          title="LinkedIn verified"
                          aria-label="LinkedIn verified certificate"
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center text-xs text-indigo-600">
                    <span className="mr-1">Click to view</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isOpen}
        onClose={closeModal}
        certificate={currentCertificate}
        certificates={certifications}
        currentIndex={currentIndex}
        onNavigate={navigate}
      />
    </motion.section>
  );
}
