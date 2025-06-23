import React from 'react';

interface SubmitButtonProps {
  readonly isSubmitting: boolean;
  readonly disabled: boolean;
  readonly children: React.ReactNode;
  readonly loadingText?: string;
}

export function SubmitButton({
  isSubmitting,
  disabled,
  children,
  loadingText = 'Sending...',
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <svg
            className="loading-spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
