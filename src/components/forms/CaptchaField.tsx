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
          reCAPTCHA configuration error
        </p>
      </div>
    );
  }

  return (
    <div className="form-captcha">
      <ReCAPTCHA
        sitekey={siteKey}
        ref={recaptchaRef}
        onChange={onChange}
        onExpired={onExpired}
        onError={onError}
        theme="light"
      />
    </div>
  );
}
