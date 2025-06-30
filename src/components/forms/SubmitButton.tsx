import React from 'react';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  readonly children: React.ReactNode;
  readonly isSubmitting: boolean;
  readonly disabled?: boolean;
  readonly loadingText?: string;
  readonly className?: string;
}

export function SubmitButton({
  children,
  isSubmitting,
  disabled = false,
  loadingText = 'Submitting...',
  className = '',
}: SubmitButtonProps) {
  const isDisabled = disabled || isSubmitting;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-disabled={isDisabled}
      aria-describedby={isDisabled ? 'submit-button-help' : undefined}
      aria-live="polite"
      aria-atomic="true"
    >
      {isSubmitting ? (
        <span
          className="flex items-center justify-center gap-2"
          aria-live="assertive"
          aria-atomic="true"
        >
          <Loader2
            className="w-4 h-4 animate-spin"
            aria-hidden="true"
            aria-label="Submitting form"
          />
          <span>{loadingText}</span>
        </span>
      ) : (
        children
      )}
      {isDisabled && (
        <span id="submit-button-help" className="sr-only">
          {isSubmitting
            ? 'Form is being submitted, please wait'
            : 'Please complete all required fields and verification to submit'}
        </span>
      )}
    </button>
  );
}
