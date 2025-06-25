/**
 * Form Validation Utilities
 *
 * Centralized validation functions for consistent form handling
 * across the application.
 */

import { FormData, FormErrors } from '@/types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single form field
 */
export function validateField(field: keyof FormData, value: string): string {
  switch (field) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
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

  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters long';
  }

  if (trimmedName.length > 100) {
    return 'Name must be less than 100 characters';
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
 * Validates message field
 */
export function validateMessage(message: string): string {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return 'Message is required';
  }

  if (trimmedMessage.length < 10) {
    return 'Message must be at least 10 characters long';
  }

  if (trimmedMessage.length > 2000) {
    return 'Message must be less than 2000 characters';
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
  message?: string;
  captchaToken?: string;
}): ContactFormValidation {
  const errors: string[] = [];

  // Check required fields
  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  }

  if (!data.message?.trim()) {
    errors.push('Message is required');
  }

  if (!data.captchaToken?.trim()) {
    errors.push('CAPTCHA verification is required');
  }

  // Validate field formats if present
  if (data.name?.trim()) {
    const nameError = validateName(data.name);
    if (nameError) errors.push(nameError);
  }

  if (data.email?.trim()) {
    const emailError = validateEmail(data.email);
    if (emailError) errors.push(emailError);
  }

  if (data.message?.trim()) {
    const messageError = validateMessage(data.message);
    if (messageError) errors.push(messageError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
