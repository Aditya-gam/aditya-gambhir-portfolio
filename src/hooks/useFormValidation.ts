import { useState, useCallback } from 'react';
import { FormData, FormErrors } from '@/types';
import { FORM_VALIDATION, ERROR_MESSAGES } from '@/constants';

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const validateField = useCallback(
    (field: keyof FormData, value: string): string => {
      switch (field) {
        case 'name':
          return !value.trim() ? ERROR_MESSAGES.REQUIRED_FIELD : '';
        case 'email':
          if (!value.trim()) {
            return ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return !FORM_VALIDATION.EMAIL_REGEX.test(value)
            ? ERROR_MESSAGES.INVALID_EMAIL
            : '';
        case 'subject':
          if (!value.trim()) {
            return ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return value.trim().length < FORM_VALIDATION.MIN_SUBJECT_LENGTH
            ? ERROR_MESSAGES.SUBJECT_TOO_SHORT
            : '';
        case 'message':
          if (!value.trim()) {
            return ERROR_MESSAGES.REQUIRED_FIELD;
          }
          return value.trim().length < FORM_VALIDATION.MIN_MESSAGE_LENGTH
            ? ERROR_MESSAGES.MESSAGE_TOO_SHORT
            : '';
        default:
          return '';
      }
    },
    [],
  );

  const validateForm = useCallback(
    (formData: FormData): boolean => {
      const newErrors: FormErrors = {
        name: validateField('name', formData.name),
        email: validateField('email', formData.email),
        subject: validateField('subject', formData.subject),
        message: validateField('message', formData.message),
      };

      setErrors(newErrors);
      return (
        !newErrors.name &&
        !newErrors.email &&
        !newErrors.subject &&
        !newErrors.message
      );
    },
    [validateField],
  );

  const clearError = useCallback((field: keyof FormData) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const validateFieldAndSetError = useCallback(
    (field: keyof FormData, value: string) => {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField],
  );

  const clearAllErrors = useCallback(() => {
    setErrors({ name: '', email: '', subject: '', message: '' });
  }, []);

  return {
    errors,
    validateForm,
    clearError,
    validateFieldAndSetError,
    clearAllErrors,
  };
}
