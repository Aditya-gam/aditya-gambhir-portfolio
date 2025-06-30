'use client';

import { ContactFormProps } from '@/types';
import { useContactForm } from '@/hooks/useContactForm';
import { FormField } from './forms/FormField';
import { CaptchaField } from './forms/CaptchaField';
import { SubmitButton } from './forms/SubmitButton';
import { CONTACT_FORM_CONTENT } from '@/data/forms';

export function ContactForm({ className = '' }: Readonly<ContactFormProps>) {
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
        {/* Name & Email on the same row for md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="contact-name"
            label={CONTACT_FORM_CONTENT.labels.name}
            type="text"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            onBlur={() => handleInputBlur('name')}
            error={errors.name}
            placeholder={CONTACT_FORM_CONTENT.placeholders.name}
            required
            disabled={submitting}
          />

          <FormField
            id="contact-email"
            label={CONTACT_FORM_CONTENT.labels.email}
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            onBlur={() => handleInputBlur('email')}
            error={errors.email}
            placeholder={CONTACT_FORM_CONTENT.placeholders.email}
            required
            disabled={submitting}
          />
        </div>

        <FormField
          id="contact-subject"
          label={CONTACT_FORM_CONTENT.labels.subject}
          type="text"
          value={formData.subject}
          onChange={(value) => handleInputChange('subject', value)}
          onBlur={() => handleInputBlur('subject')}
          error={errors.subject}
          placeholder={CONTACT_FORM_CONTENT.placeholders.subject}
          required
          disabled={submitting}
        />

        <FormField
          id="contact-message"
          label={CONTACT_FORM_CONTENT.labels.message}
          type="textarea"
          value={formData.message}
          onChange={(value) => handleInputChange('message', value)}
          onBlur={() => handleInputBlur('message')}
          error={errors.message}
          placeholder={CONTACT_FORM_CONTENT.placeholders.message}
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
          loadingText={CONTACT_FORM_CONTENT.buttons.submitting}
        >
          {CONTACT_FORM_CONTENT.buttons.submit}
        </SubmitButton>
      </form>
    </div>
  );
}
