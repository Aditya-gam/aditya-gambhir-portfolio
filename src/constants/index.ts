// Application constants

// Contact Form Constants
export const FORM_VALIDATION = {
  MIN_MESSAGE_LENGTH: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Navigation Constants
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About Me', href: '/about' },
] as const;

// Homepage Section IDs for smooth scrolling
export const HOMEPAGE_SECTIONS = [
  'hero',
  'highlights',
  'projects',
  'publications',
  'cta',
] as const;

// Social Links
export const SOCIAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/aditya-gambhir',
  GITHUB: 'https://github.com/Aditya-gam',
} as const;

// API Routes
export const API_ROUTES = {
  CONTACT: '/api/contact',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  MESSAGE_TOO_SHORT: `Message must be at least ${FORM_VALIDATION.MIN_MESSAGE_LENGTH} characters long.`,
  CAPTCHA_REQUIRED: 'Please complete the reCAPTCHA verification.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  NETWORK_ERROR: 'Failed to send message. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CONTACT_SENT: "Message sent successfully! I'll get back to you soon.",
} as const;

// Application Metadata
export const APP_METADATA = {
  TITLE: 'Aditya Gambhir | Software Engineer & Data Scientist',
  DESCRIPTION:
    'Software Engineer and Data Scientist with 2+ years of experience in full-stack development and machine learning.',
  KEYWORDS: [
    'Aditya Gambhir',
    'Software Engineer',
    'Data Scientist',
    'MERN Stack',
    'Python',
    'Machine Learning',
    'Full Stack Developer',
    'Portfolio',
  ],
  SITE_URL: 'https://aditya-gambhir-portfolio.vercel.app/',
} as const;
