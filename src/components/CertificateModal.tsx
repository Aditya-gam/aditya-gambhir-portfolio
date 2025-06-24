'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificateViewer from './CertificateViewer';
import type { CertificateModalProps } from '@/types';

export default function CertificateModal({
  isOpen,
  onClose,
  certificate,
  certificates,
  currentIndex,
  onNavigate,
}: CertificateModalProps) {
  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onNavigate('prev');
          break;
        case 'ArrowRight':
          event.preventDefault();
          onNavigate('next');
          break;
      }
    },
    [isOpen, onClose, onNavigate],
  );

  // Set up keyboard listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const modalElement = document.getElementById('certificate-modal');
      modalElement?.focus();
    }
  }, [isOpen]);

  if (!certificate) return null;

  const isFirstCert = currentIndex === 0;
  const isLastCert = currentIndex === certificates.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* Modal Content */}
          <motion.div
            id="certificate-modal"
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden focus:outline-none"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center space-x-4">
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Certificate {currentIndex + 1} of {certificates.length}
                </h2>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>Navigate with</span>
                  <kbd className="px-2 py-1 text-xs font-mono bg-gray-200 rounded">
                    ←
                  </kbd>
                  <kbd className="px-2 py-1 text-xs font-mono bg-gray-200 rounded">
                    →
                  </kbd>
                  <span>or</span>
                  <kbd className="px-2 py-1 text-xs font-mono bg-gray-200 rounded">
                    ESC
                  </kbd>
                  <span>to close</span>
                </div>
              </div>

              {/* Navigation & Close */}
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => onNavigate('prev')}
                  disabled={isFirstCert}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous certificate"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={() => onNavigate('next')}
                  disabled={isLastCert}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next certificate"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <CertificateViewer
                certificate={certificate}
                onLinkedIn={() => {
                  // Track LinkedIn verification
                  console.log(
                    'LinkedIn verification clicked:',
                    certificate.title,
                  );
                }}
              />
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / certificates.length) * 100}%`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
