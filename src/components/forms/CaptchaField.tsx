import React, { RefObject } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaFieldProps {
  readonly recaptchaRef: RefObject<ReCAPTCHA | null>;
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
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured');
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
    console.error('reCAPTCHA error occurred');
    console.error('Current site key:', siteKey);
    console.error('Current hostname:', window.location.hostname);
    onError();
  };

  return (
    <div className="form-captcha">
      <ReCAPTCHA
        sitekey={siteKey}
        ref={recaptchaRef}
        onChange={onChange}
        onExpired={onExpired}
        onError={handleError}
        theme="light"
        size="normal"
      />
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-muted-foreground mt-2">
          Debug: Site key configured ({siteKey.substring(0, 10)}...)
        </div>
      )}
    </div>
  );
}
