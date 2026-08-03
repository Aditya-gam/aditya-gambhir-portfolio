/**
 * Form Validation Utilities — shared by the client form and the contact API.
 */
import { FormData, FormErrors } from '@/types';

// === Validation Constants ===
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 100;
export const SUBJECT_MIN_LENGTH = 3;
export const SUBJECT_MAX_LENGTH = 150;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;

const LOCAL_PART_REGEX = /^[^\s@]{1,64}$/;
const DOMAIN_REGEX = /^[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_REGEX = new RegExp(
  `${LOCAL_PART_REGEX.source.slice(1, -1)}@${DOMAIN_REGEX.source.slice(1, -1)}`,
);
const NAME_REGEX = /^[\p{L}\p{M}'\- ]+$/u;

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

export function validateName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return 'Name is required';
  if (trimmed.length < NAME_MIN_LENGTH)
    return `Name must be at least ${NAME_MIN_LENGTH} characters long`;
  if (trimmed.length > NAME_MAX_LENGTH)
    return `Name must be less than ${NAME_MAX_LENGTH} characters`;
  if (!NAME_REGEX.test(trimmed)) return 'Name contains invalid characters';
  return '';
}

export function validateEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address';
  return '';
}

export function validateSubject(subject: string): string {
  const trimmed = subject.trim();
  if (!trimmed) return 'Subject is required';
  if (trimmed.length < SUBJECT_MIN_LENGTH)
    return `Subject must be at least ${SUBJECT_MIN_LENGTH} characters long`;
  if (trimmed.length > SUBJECT_MAX_LENGTH)
    return `Subject must be less than ${SUBJECT_MAX_LENGTH} characters`;
  return '';
}

export function validateMessage(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return 'Message is required';
  if (trimmed.length < MESSAGE_MIN_LENGTH)
    return `Message must be at least ${MESSAGE_MIN_LENGTH} characters long`;
  if (trimmed.length > MESSAGE_MAX_LENGTH)
    return `Message must be less than ${MESSAGE_MAX_LENGTH} characters`;
  return '';
}

export function validateFormData(data: FormData): FormErrors {
  return {
    name: validateName(data.name),
    email: validateEmail(data.email),
    subject: validateSubject(data.subject),
    message: validateMessage(data.message),
  };
}

export function hasValidationErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((error) => error !== '');
}

/** Escapes HTML to prevent XSS in the emailed message body. */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export interface ContactFormValidation {
  isValid: boolean;
  errors: string[];
}

export function validateContactFormSubmission(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}): ContactFormValidation {
  const errors: string[] = [];

  (
    [
      ['name', 'Name is required'],
      ['email', 'Email is required'],
      ['subject', 'Subject is required'],
      ['message', 'Message is required'],
    ] as const
  ).forEach(([field, message]) => {
    if (!data[field]?.trim()) errors.push(message);
  });

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
