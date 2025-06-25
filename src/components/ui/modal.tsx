/**
 * Generic Modal Component
 *
 * A reusable modal base component with common functionality like
 * focus management, keyboard handling, and accessibility features.
 */

'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly className?: string;
  readonly maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  readonly showCloseButton?: boolean;
  readonly closeOnOverlayClick?: boolean;
  readonly closeOnEscape?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  className = '',
  maxWidth = 'lg',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

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
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            event.preventDefault();
          }
        } else if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEscape]);

  // Focus management on open
  useEffect(() => {
    if (!isOpen) return;

    // Store current focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus modal when opened
    const timer = setTimeout(() => {
      const modal = modalRef.current;
      if (!modal) return;

      const firstFocusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement;

      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modal.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Focus management on close
  useEffect(() => {
    if (isOpen || !previousFocusRef.current) return;

    previousFocusRef.current.focus();
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayInteraction = (
    e: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (!closeOnOverlayClick) return;

    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    // Only close if clicking the overlay itself, not the modal content
    if (target === currentTarget) {
      if (e.type === 'click') {
        onClose();
      }

      if (e.type === 'keydown') {
        const keyEvent = e as React.KeyboardEvent;
        if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          onClose();
        }
      }
    }
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm border-0 cursor-default"
      onClick={handleOverlayInteraction}
      onKeyDown={handleOverlayInteraction}
      aria-label="Close modal overlay"
    >
      <dialog
        ref={modalRef}
        className={`bg-background border rounded-lg shadow-lg ${maxWidthClasses[maxWidth]} w-full ${className}`}
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
        open
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold">
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="text-sm text-muted-foreground mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`${title || showCloseButton ? 'p-6' : 'p-0'}`}>
          {children}
        </div>
      </dialog>
    </button>
  );
}
