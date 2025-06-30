'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { Button } from './ui/button';
import { UI_COPY } from '@/data/ui';

interface ContactModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle overlay click with useCallback for stable reference
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  // Focus trapping and keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      // Focus trapping
      if (event.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab: focus previous element
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else if (document.activeElement === lastElement) {
          // Tab: focus next element
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus close button when modal opens
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.dialog
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 0,
            padding: 0,
            border: 'none',
            maxWidth: 'none',
            maxHeight: 'none',
            width: '100%',
            height: '100%',
          }}
          onClick={handleOverlayClick}
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
          open={isOpen}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1], // easeOut cubic-bezier
            }}
            className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 bg-background border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{
              // CSS fallback for browsers without Framer Motion
              transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
              opacity: isOpen ? 1 : 0,
              transition:
                'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s ease',
              pointerEvents: 'auto',
            }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <h2
                  id="contact-modal-title"
                  className="text-xl font-semibold text-foreground"
                >
                  {UI_COPY.contactModal.title}
                </h2>
                <p
                  id="contact-modal-description"
                  className="text-sm text-muted-foreground mt-1"
                >
                  {UI_COPY.contactModal.description}
                </p>
              </div>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
                aria-label="Close contact modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <ContactForm className="max-w-none" />
            </div>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
