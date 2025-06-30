// Centralized content for all UI text, labels, messages, and accessibility strings

// Navigation & Accessibility
export const NAVIGATION_CONTENT = {
  skipToMain: 'Skip to main content',
  mainContent: 'main-content',
  navigation: 'Navigation',
  openMenu: 'Open navigation menu',
  closeMenu: 'Close navigation menu',
  goToHomepage: 'Go to homepage',
  goToSection: (label: string) => `Go to ${label} section`,
  goToPage: (label: string) => `Go to ${label} page`,
} as const;

// Theme Toggle
export const THEME_CONTENT = {
  switchToLight: 'Switch to light mode',
  switchToDark: 'Switch to dark mode',
  switchToSystem: 'Switch to system theme',
  toggleTheme: 'Toggle theme',
  currentTheme: (theme: string, resolved: string) =>
    `Theme: ${theme}, Resolved: ${resolved}`,
} as const;

// Header & Footer
export const HEADER_FOOTER_CONTENT = {
  header: {
    brand: 'Aditya Gambhir',
  },
  footer: {
    copyright: (year: number, name: string) =>
      `© ${year} ${name}. All rights reserved.`,
    socialLinks: {
      github: 'Aditya on GitHub',
      linkedin: 'Aditya on LinkedIn',
      contact: 'Contact Aditya',
    },
  },
} as const;

// Hero Section
export const HERO_CONTENT = {
  opportunityBadge: {
    open: 'Open to Opportunities',
    closed: 'Currently Unavailable',
  },
  cta: {
    resumeButton: 'Download Resume',
    contactButton: "Let's Talk",
  },
  scrollCue: {
    ariaLabel: 'Scroll to next section',
    text: 'Scroll to explore',
  },
} as const;

// About Section
export const ABOUT_CONTENT = {
  sectionTitle: 'About Me',
  cta: {
    title: 'Ready to Collaborate?',
    description:
      "I'm always interested in discussing new opportunities, innovative projects, and ways to create meaningful impact through technology. Whether you're looking for technical expertise, collaborative partnership, or just want to connect, I'd love to hear from you.",
    resumeButton: 'Download Resume',
    contactButton: 'Start Conversation',
  },
  dualExpertise: {
    heading: 'Dual Expertise',
  },
  personalTouch: {
    heading: 'Quick Facts',
    labels: {
      favoriteStack: 'Favorite Stack:',
      coffee: 'Coffee Aficionado:',
      guitar: 'Amateur Guitarist:',
    },
  },
} as const;

// Skills Section
export const SKILLS_CONTENT = {
  sectionTitle: 'Skills Matrix',
  skillCount: (count: number) => `${count} skills`,
  skillAriaLabel: (skill: string, category: string) =>
    `${skill} - ${category} skill`,
} as const;

// Experience Section
export const EXPERIENCE_CONTENT = {
  timeline: {
    heading: 'Experience Timeline',
    navigationInstruction:
      'Use arrow keys to navigate through experience items',
    workExperience: 'Work experience timeline',
    experienceAt: (company: string, role: string) =>
      `Experience at ${company} as ${role}`,
    responsibilitiesAt: (company: string) => `Responsibilities at ${company}`,
    showMore: (count: number) => `Show ${count} more`,
    showLess: 'Show less',
  },
  education: {
    heading: 'Education',
    relevantCoursework: 'Relevant Coursework',
    gpa: (gpa: string) => `GPA: ${gpa}`,
  },
  publications: {
    heading: 'Publications',
    callout: 'Click to view abstract and read full paper',
    viewDetails: (title: string) => `View details for ${title}`,
    readFullPaper: 'Read Full Paper',
    abstract: 'Abstract',
  },
  certifications: {
    heading: 'Certifications',
    scrollableContainer: 'Scrollable certifications container',
    professionalCerts: 'Professional certifications',
    viewCertificate: (title: string) => `View ${title} certificate`,
    certificateAvailable: 'Certificate document available',
    linkedinVerified: 'LinkedIn verified certificate',
    clickToView: 'Click to view',
    verifyCertificate: (title: string) => `Verify ${title} on LinkedIn`,
    verify: 'Verify',
    certificateLabel: (title: string) => `Certificate: ${title}`,
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    issuedDate: (date: string) => `Issued: ${date}`,
    certificateNotAvailable: 'Certificate not available',
    certificateUnavailableDescription:
      'This certificate is currently unavailable for viewing.',
    tryAgainLater: 'Please try again later or contact support.',
  },
  communityLeadership: {
    heading: 'Community & Leadership',
  },
} as const;

// Projects Section
export const PROJECTS_CONTENT = {
  sectionTitle: 'Featured Projects',
  cta: 'Explore all projects',
  allProjectsLabel: 'View all projects',
  viewSourceCode: (title: string) => `View ${title} source code on GitHub`,
  viewLiveDemo: (title: string) => `View ${title} live demo`,
  projectScreenshot: (title: string) => `${title} project screenshot`,
  scrollHint: (count: number) =>
    `Scroll horizontally to view all ${count} projects`,
  moreTech: (count: number) => `+${count} more`,
} as const;

// Contact Section
export const CONTACT_CONTENT = {
  sectionTitle: 'Get In Touch',
  description:
    "Ready to collaborate on your next project? Let's discuss how I can help bring your ideas to life.",
  connectHeading: "Let's Connect",
  socialHeading: 'Find me on',
  emailAriaLabel: 'Send email to Aditya Gambhir',
  openLocationOnMaps: (location: string) => `Open ${location} on Google Maps`,
  modal: {
    title: 'Contact Me',
    description: "Let's start a conversation",
    close: 'Close contact modal',
  },
} as const;

// Social Profiles
export const SOCIAL_CONTENT = {
  defaultTitle: 'Connect With Me',
  viewProfile: (name: string, platform: string) =>
    `View ${name}'s ${platform} profile`,
  visitProfile: (platform: string) => `Visit ${platform} profile`,
  platformNames: {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    leetcode: 'LeetCode',
  },
  viewPlatformProfile: (platform: string) => `View ${platform} Profile`,
  scrollHint: (count: number) =>
    `Scroll horizontally to view all ${count} profiles`,
} as const;

// Stats & Counters
export const STATS_CONTENT = {
  statLabel: (value: string, label: string) => `${value} ${label}`,
} as const;

// Modal & Dialog Content
export const MODAL_CONTENT = {
  close: 'Close modal',
  closeOverlay: 'Close modal overlay',
  previous: 'Previous',
  next: 'Next',
  escape: 'ESC',
  arrowKeys: '← →',
  keyboardInstructions: 'Use ← → or ESC',
  certificateModal: {
    previous: 'Previous certificate',
    next: 'Next certificate',
    counter: (current: number, total: number) => `${current} of ${total}`,
  },
  resumeModal: {
    switchTo: (title: string) => `Switch to ${title}`,
    download: 'Download',
    view: 'View',
    print: 'Print',
  },
} as const;

// Carousel & Navigation
export const CAROUSEL_CONTENT = {
  previousItem: 'Previous item',
  nextItem: 'Next item',
  goToItem: (index: number) => `Go to item ${index + 1}`,
} as const;

// Loading & Status Messages
export const STATUS_CONTENT = {
  loading: 'Loading...',
  submitting: 'Submitting...',
  sending: 'Sending...',
  processing: 'Processing...',
  submittingForm: 'Submitting form',
  pleaseWait: 'please wait',
  formBeingSubmitted: 'Form is being submitted, please wait',
  completeCaptcha:
    'Please complete all required fields and verification to submit',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  required: 'This field is required.',
  invalidEmail: 'Please enter a valid email address.',
  messageTooShort: (minLength: number) =>
    `Message must be at least ${minLength} characters long.`,
  subjectTooShort: (minLength: number) =>
    `Subject must be at least ${minLength} characters long.`,
  captchaRequired: 'Please complete the reCAPTCHA verification.',
  genericError: 'An unexpected error occurred. Please try again.',
  networkError: 'Failed to send message. Please try again.',
  configError: 'Configuration error',
  recaptchaError: 'reCAPTCHA configuration error: Site key not found',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  contactSent: "Message sent successfully! I'll get back to you soon.",
  formSubmitted: 'Form submitted successfully!',
} as const;

// Accessibility Labels
export const ACCESSIBILITY_LABELS = {
  requiredField: 'required field',
  mainNavigation: 'Main navigation',
  socialNavigation: 'Social media links',
  sectionHeading: (section: string) => `${section} section`,
  skipLink: 'Skip to main content',
  currentPage: 'Current page',
  externalLink: 'Opens in a new tab',
} as const;
