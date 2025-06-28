import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { env } from '@/config/env';
import { logger } from '@/lib/logger';

interface CaptchaFieldProps {
  readonly recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  readonly onChange: (token: string | null) => void;
  readonly onExpired: () => void;
  readonly onError: () => void;
}

export function CaptchaField({
  recaptchaRef,
  onChange,
  onExpired,
  onError,
}: CaptchaFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    if (process.env.NODE_ENV !== 'production') {
      logger.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured');
    }
    return (
      <div className="form-captcha">
        <p className="text-sm text-destructive">
          reCAPTCHA configuration error: Site key not found
        </p>
      </div>
    );
  }

  // Enhanced error handler for debugging
  const handleError = () => {
    if (process.env.NODE_ENV !== 'production') {
      logger.error('reCAPTCHA error occurred', {
        siteKey: siteKey?.substring(0, 10) + '...',
        hostname: window.location.hostname,
      });
    }
    onError();
  };

  return (
    <div className="form-captcha" role="group" aria-labelledby="captcha-label">
      <div id="captcha-label" className="sr-only">
        Security verification required to submit form
      </div>
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={env.RECAPTCHA_SITE_KEY!}
          onChange={onChange}
          onExpired={onExpired}
          onError={handleError}
          theme="light"
          aria-label="Complete the reCAPTCHA to verify you are human"
        />
      </div>
      <p className="form-helper">
        Complete the verification above to send your message
      </p>
    </div>
  );
}
