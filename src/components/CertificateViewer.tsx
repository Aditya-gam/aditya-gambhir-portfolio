'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { CertificateViewerProps } from '@/types';

export default function CertificateViewer({
  certificate,
  onLinkedIn,
}: CertificateViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleLinkedInVerify = () => {
    if (certificate.linkedinUrl) {
      window.open(certificate.linkedinUrl, '_blank', 'noopener,noreferrer');
    }
    onLinkedIn?.();
  };

  return (
    <div className="space-y-4">
      {/* Certificate Header */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {certificate.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {certificate.provider} • {certificate.month} {certificate.year}
          </span>
          <div className="flex items-center space-x-3">
            {certificate.linkedinUrl && (
              <button
                onClick={handleLinkedInVerify}
                className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                aria-label={`Verify ${certificate.title} on LinkedIn`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>Verify</span>
              </button>
            )}
          </div>
        </div>
        {certificate.description && (
          <p className="text-sm text-gray-600 italic">
            {certificate.description}
          </p>
        )}
      </div>

      {/* Certificate Display */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden">
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center space-x-2 text-gray-600">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Loading certificate...</span>
            </div>
          </motion.div>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg
              className="w-12 h-12 mb-4"
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
            <p className="text-sm">Certificate preview not available</p>
            <p className="text-xs text-gray-400 mt-1">
              Use the download button to view the certificate
            </p>
          </div>
        ) : (
          certificate.filePath && (
            <iframe
              src={`${certificate.filePath}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-96 border-0"
              title={`${certificate.title} Certificate`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              aria-label={`Certificate: ${certificate.title}`}
            />
          )
        )}
      </div>
    </div>
  );
}
