'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'sonner';

// TypeScript interfaces for better type safety
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  readonly className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: FormErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Handle input blur for real-time validation
  const handleInputBlur = (field: keyof FormData) => {
    const value = formData[field];
    let error = '';

    switch (field) {
      case 'name':
        if (!value.trim()) error = 'Name is required.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required.';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters long.';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!captchaToken) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");

        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
        setErrors({ name: '', email: '', message: '' });
      } else {
        toast.error(
          result.error ?? 'Failed to send message. Please try again.',
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`form-container ${className}`}>
      <form onSubmit={handleSubmit} className="form-layout" noValidate>
        {/* Name Field */}
        <div className="form-field">
          <label htmlFor="contact-name" className="form-label">
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleInputBlur('name')}
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={submitting}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="form-error">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="contact-email" className="form-label">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            placeholder="your.email@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={submitting}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="form-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="form-field">
          <label htmlFor="contact-message" className="form-label">
            Message *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => handleInputBlur('message')}
            className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
            placeholder="Tell me about your project, question, or how I can help you..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={submitting}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="form-error">
              {errors.message}
            </p>
          )}
        </div>

        {/* reCAPTCHA */}
        <div className="form-captcha">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            onChange={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
            onError={() => {
              setCaptchaToken(null);
              toast.error('reCAPTCHA error. Please try again.');
            }}
            theme="light"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || !captchaToken}
          className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 010 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      {/* Form helper text */}
      <p className="form-helper">
        * Required fields. I typically respond within 24 hours.
      </p>
    </div>
  );
}
