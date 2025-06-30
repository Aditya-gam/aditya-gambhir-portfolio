// Application constants

// Import centralized content
import { FORM_VALIDATION, CONTACT_FORM_CONTENT } from '@/data/forms';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/data/content';
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
  REQUIRED_FIELD: ERROR_MESSAGES.required,
  INVALID_EMAIL: ERROR_MESSAGES.invalidEmail,
  MESSAGE_TOO_SHORT: ERROR_MESSAGES.messageTooShort(
    FORM_VALIDATION.MIN_MESSAGE_LENGTH,
  ),
  SUBJECT_TOO_SHORT: ERROR_MESSAGES.subjectTooShort(
    FORM_VALIDATION.MIN_SUBJECT_LENGTH,
  ),
  CAPTCHA_REQUIRED: ERROR_MESSAGES.captchaRequired,
  GENERIC_ERROR: ERROR_MESSAGES.genericError,
  NETWORK_ERROR: ERROR_MESSAGES.networkError,
} as const;

// Success Messages - Re-export from centralized content
export const SUCCESS_MESSAGES_LEGACY = {
  CONTACT_SENT: SUCCESS_MESSAGES.contactSent,
} as const;

// Application Metadata - Re-export from centralized metadata
export const APP_METADATA = {
  TITLE: SEO_METADATA.title.default,
  DESCRIPTION: SEO_METADATA.description,
  KEYWORDS: SEO_METADATA.keywords,
  SITE_URL: SITE_CONFIG.url,
} as const;
