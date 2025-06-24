'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Clock, AlertCircle } from 'lucide-react';
import type { CertificateViewerProps } from '@/types';

export default function CertificateViewer({
  certificate,
  onLinkedIn,
}: Readonly<CertificateViewerProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleLinkedInVerify = () => {
    onLinkedIn?.();
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const certificateDate = `${certificate.month} ${certificate.year}`;

  return (
    <div className="space-y-4">
      {/* Certificate Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {certificate.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{certificate.provider}</span>
            <span>•</span>
            <span>{certificateDate}</span>
          </div>
          <button
            onClick={handleToggleDetails}
            className="flex items-center space-x-1 px-3 py-1 text-primary hover:text-primary/80 hover:bg-accent rounded-md transition-colors"
          >
            <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex items-center space-x-3">
          {certificate.linkedinUrl && (
            <button
              onClick={handleLinkedInVerify}
              className="flex items-center space-x-1 px-3 py-1 text-primary hover:text-primary/80 hover:bg-accent rounded-md transition-colors"
              aria-label={`Verify ${certificate.title} on LinkedIn`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Verify</span>
            </button>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            {certificate.description}
          </p>
        </div>
      )}

      {/* Certificate Display */}
      <div className="certificate-container bg-background rounded-lg border overflow-hidden">
        <div className="relative bg-muted/30 rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Issued: {certificateDate}</span>
          </div>

          {hasError ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">Certificate not available</p>
              <p className="text-sm">
                This certificate is currently unavailable for viewing.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Please try again later or contact support.
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
    </div>
  );
}
