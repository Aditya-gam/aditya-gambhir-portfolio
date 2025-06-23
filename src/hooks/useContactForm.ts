import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'sonner';
import { FormData, ContactAPIResponse } from '@/types';
import { useFormValidation } from './useFormValidation';
import { API_ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    errors,
    validateForm,
    clearError,
    validateFieldAndSetError,
    clearAllErrors,
  } = useFormValidation();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      clearError(field);
    }
  };

  const handleInputBlur = (field: keyof FormData) => {
    const value = formData[field];
    validateFieldAndSetError(field, value);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
    clearAllErrors();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    if (!captchaToken) {
      toast.error(ERROR_MESSAGES.CAPTCHA_REQUIRED);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(API_ROUTES.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const result: ContactAPIResponse = await response.json();

      if (response.ok) {
        toast.success(SUCCESS_MESSAGES.CONTACT_SENT);
        resetForm();
      } else {
        toast.error(result.error ?? ERROR_MESSAGES.NETWORK_ERROR);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    toast.error('reCAPTCHA error. Please try again.');
  };

  return {
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
  };
}
