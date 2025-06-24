'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import CertificateViewer from './CertificateViewer';
import type { CertificateModalProps } from '@/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CertificateModal({
  isOpen,
  onClose,
  certificates,
  currentIndex,
  onNavigate,
}: CertificateModalProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate('prev');
      } else if (
        e.key === 'ArrowRight' &&
        currentIndex < certificates.length - 1
      ) {
        onNavigate('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, certificates.length, onClose, onNavigate]);

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

  if (!isOpen || !certificates[currentIndex]) return null;

  const certificate = certificates[currentIndex];
  const handlePrevious = () => onNavigate('prev');
  const handleNext = () => onNavigate('next');
  const progress = ((currentIndex + 1) / certificates.length) * 100;

  return createPortal(
    <div className="mobile-nav-portal">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.dialog
        open={isOpen}
        className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-lg shadow-2xl z-[101] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <div className="flex-1">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-foreground"
            >
              {certificate.title}
            </h2>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Use</span>
              <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                ←
              </kbd>
              <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                →
              </kbd>
              <span>or</span>
              <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                ESC
              </kbd>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {certificates.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === certificates.length - 1}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-6">
          <div id="modal-description">
            <CertificateViewer
              certificate={certificate}
              onLinkedIn={() =>
                certificate.linkedinUrl &&
                window.open(certificate.linkedinUrl, '_blank')
              }
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.dialog>
    </div>,
    document.body,
  );
}
