import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { env } from '@/config/env';
import { logger } from '@/lib/logger';
import { CONTACT_FORM_CONTENT } from '@/data/forms';

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
          {CONTACT_FORM_CONTENT.captcha.errorText}
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
    <fieldset className="form-captcha" aria-labelledby="captcha-label">
      <legend id="captcha-label" className="sr-only">
        {CONTACT_FORM_CONTENT.captcha.securityLabel}
      </legend>
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={env.RECAPTCHA_SITE_KEY!}
          onChange={onChange}
          onExpired={onExpired}
          onError={handleError}
          theme="light"
          aria-label={CONTACT_FORM_CONTENT.captcha.ariaLabel}
        />
      </div>
      <p className="form-helper">{CONTACT_FORM_CONTENT.captcha.helpText}</p>
    </fieldset>
  );
}
