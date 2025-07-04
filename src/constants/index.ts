// Application constants

// Import centralized content
import { FORM_VALIDATION } from '@/data/forms';
import {
  ERROR_MESSAGES as ERROR_MESSAGES_CONTENT,
  SUCCESS_MESSAGES as SUCCESS_MESSAGES_CONTENT,
} from '@/data/content';
import { SEO_METADATA, SITE_CONFIG } from '@/data/metadata';

// Contact Form Constants
export { FORM_VALIDATION } from '@/data/forms';

// Navigation Constants - Smooth scroll navigation for single-page homepage
export { NAVIGATION_ITEMS, EXTERNAL_NAVIGATION } from '@/data/navigation';

// Homepage Section IDs for smooth scrolling
export const HOMEPAGE_SECTIONS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
  'publications',
] as const;

// Social Links
export const SOCIAL_LINKS = {
  LINKEDIN: SITE_CONFIG.author.linkedin,
  GITHUB: SITE_CONFIG.author.github,
} as const;

// API Routes
export const API_ROUTES = {
  CONTACT: '/api/contact',
} as const;

// Error Messages - Re-export from centralized content
export const ERROR_MESSAGES_LEGACY = {
  REQUIRED_FIELD: ERROR_MESSAGES_CONTENT.required,
  INVALID_EMAIL: ERROR_MESSAGES_CONTENT.invalidEmail,
  MESSAGE_TOO_SHORT: ERROR_MESSAGES_CONTENT.messageTooShort(
    FORM_VALIDATION.MIN_MESSAGE_LENGTH,
  ),
  SUBJECT_TOO_SHORT: ERROR_MESSAGES_CONTENT.subjectTooShort(
    FORM_VALIDATION.MIN_SUBJECT_LENGTH,
  ),
  CAPTCHA_REQUIRED: ERROR_MESSAGES_CONTENT.captchaRequired,
  GENERIC_ERROR: ERROR_MESSAGES_CONTENT.genericError,
  NETWORK_ERROR: ERROR_MESSAGES_CONTENT.networkError,
} as const;

// Success Messages - Re-export from centralized content
export const SUCCESS_MESSAGES_LEGACY = {
  CONTACT_SENT: SUCCESS_MESSAGES_CONTENT.contactSent,
} as const;

// Alias exports for backward compatibility
export const ERROR_MESSAGES = ERROR_MESSAGES_LEGACY;
export const SUCCESS_MESSAGES = SUCCESS_MESSAGES_LEGACY;

// Application Metadata - Re-export from centralized metadata
export const APP_METADATA = {
  TITLE: SEO_METADATA.title.default,
  DESCRIPTION: SEO_METADATA.description,
  KEYWORDS: SEO_METADATA.keywords,
  SITE_URL: SITE_CONFIG.url,
} as const;
