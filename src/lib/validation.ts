/**
 * Form Validation Utilities
 *
 * Centralized validation functions for consistent form handling
 * across the application.
 */

import { FormData, FormErrors } from '@/types';

// === Validation Constants (centralized for easy auditing & updates) ===
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 100;
export const SUBJECT_MIN_LENGTH = 3;
export const SUBJECT_MAX_LENGTH = 150;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;

// Email validation with low regex-complexity (<20) — leverages two simpler patterns
const LOCAL_PART_REGEX = /^[^\s@]{1,64}$/; // no spaces/@, max 64 chars
const DOMAIN_REGEX = /^[^\s@]+\.[^\s@]{2,}$/; // must contain a dot & TLD ≥2 chars

const EMAIL_REGEX = new RegExp(
  `${LOCAL_PART_REGEX.source.slice(1, -1)}@${DOMAIN_REGEX.source.slice(1, -1)}`,
);

// Name should only contain letters, spaces, apostrophes & dashes (Unicode safe)
const NAME_REGEX = /^[\p{L}\p{M}'\- ]+$/u;

/**
 * Validates a single form field
 */
export function validateField(field: keyof FormData, value: string): string {
  switch (field) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'subject':
      return validateSubject(value);
    case 'message':
      return validateMessage(value);
    default:
      return '';
  }
}

/**
 * Validates name field
 */
export function validateName(name: string): string {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return 'Name is required';
  }

  if (trimmedName.length < NAME_MIN_LENGTH) {
    return `Name must be at least ${NAME_MIN_LENGTH} characters long`;
  }

  if (trimmedName.length > NAME_MAX_LENGTH) {
    return `Name must be less than ${NAME_MAX_LENGTH} characters`;
  }

  if (!NAME_REGEX.test(trimmedName)) {
    return 'Name contains invalid characters';
  }

  return '';
}

/**
 * Validates email field
 */
export function validateEmail(email: string): string {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return 'Email is required';
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return 'Please enter a valid email address';
  }

  return '';
}

/**
 * Validates subject field
 */
export function validateSubject(subject: string): string {
  const trimmed = subject.trim();
  if (!trimmed) {
    return 'Subject is required';
  }
  if (trimmed.length < SUBJECT_MIN_LENGTH) {
    return `Subject must be at least ${SUBJECT_MIN_LENGTH} characters long`;
  }
  if (trimmed.length > SUBJECT_MAX_LENGTH) {
    return `Subject must be less than ${SUBJECT_MAX_LENGTH} characters`;
  }
  return '';
}

/**
 * Validates message field
 */
export function validateMessage(message: string): string {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return 'Message is required';
  }

  if (trimmedMessage.length < MESSAGE_MIN_LENGTH) {
    return `Message must be at least ${MESSAGE_MIN_LENGTH} characters long`;
  }

  if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
    return `Message must be less than ${MESSAGE_MAX_LENGTH} characters`;
  }

  return '';
}

/**
 * Validates entire form data
 */
export function validateFormData(data: FormData): FormErrors {
  return {
    name: validateName(data.name),
    email: validateEmail(data.email),
    subject: validateSubject(data.subject),
    message: validateMessage(data.message),
  };
}

/**
 * Checks if form has any validation errors
 */
export function hasValidationErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((error) => error !== '');
}

/**
 * Sanitizes HTML to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Server-side validation for contact form submission
 */
export interface ContactFormValidation {
  isValid: boolean;
  errors: string[];
}

export function validateContactFormSubmission(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  captchaToken?: string;
}): ContactFormValidation {
  const errors: string[] = [];

  // Required field validations (data-driven)
  (
    [
      ['name', 'Name is required'],
      ['email', 'Email is required'],
      ['subject', 'Subject is required'],
      ['message', 'Message is required'],
      ['captchaToken', 'CAPTCHA verification is required'],
    ] as const
  ).forEach(([field, message]) => {
    if (!data[field]?.trim()) {
      errors.push(message);
    }
  });

  // Field format validations (data-driven)
  (
    [
      ['name', validateName],
      ['email', validateEmail],
      ['subject', validateSubject],
      ['message', validateMessage],
    ] as const
  ).forEach(([field, validator]) => {
    const value = data[field];
    if (typeof value === 'string' && value.trim()) {
      const error = validator(value);
      if (error) errors.push(error);
    }
  });

  return { isValid: errors.length === 0, errors };
}
