'use client';

import { ContactFormProps } from '@/types';
import { useContactForm } from '@/hooks/useContactForm';
import { FormField } from './forms/FormField';
import { CaptchaField } from './forms/CaptchaField';
import { SubmitButton } from './forms/SubmitButton';

export function ContactForm({ className = '' }: ContactFormProps) {
  const {
    formData,
    errors,
    captchaToken,
    submitting,
    recaptchaRef,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
    handleCaptchaChange,
    handleCaptchaExpired,
    handleCaptchaError,
  } = useContactForm();

  return (
    <div className={`form-container ${className}`}>
      <form onSubmit={handleSubmit} className="form-layout" noValidate>
        <FormField
          id="contact-name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
          onBlur={() => handleInputBlur('name')}
          error={errors.name}
          placeholder="Your full name"
          required
          disabled={submitting}
        />

        <FormField
          id="contact-email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          onBlur={() => handleInputBlur('email')}
          error={errors.email}
          placeholder="your.email@example.com"
          required
          disabled={submitting}
        />

        <FormField
          id="contact-message"
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={(value) => handleInputChange('message', value)}
          onBlur={() => handleInputBlur('message')}
          error={errors.message}
          placeholder="Tell me about your project, question, or how I can help you..."
          required
          disabled={submitting}
          rows={5}
        />

        <CaptchaField
          recaptchaRef={recaptchaRef}
          onChange={handleCaptchaChange}
          onExpired={handleCaptchaExpired}
          onError={handleCaptchaError}
        />

        <SubmitButton
          isSubmitting={submitting}
          disabled={!captchaToken}
          loadingText="Sending..."
        >
          Send Message
        </SubmitButton>
      </form>
    </div>
  );
}
