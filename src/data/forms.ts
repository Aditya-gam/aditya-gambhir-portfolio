// Form-related content and configuration

// Form Validation Configuration
export const FORM_VALIDATION = {
  MIN_MESSAGE_LENGTH: 10,
  MIN_SUBJECT_LENGTH: 3,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Contact Form Content
export const CONTACT_FORM_CONTENT = {
  labels: {
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
  },
  placeholders: {
    name: 'Your full name',
    email: 'your.email@example.com',
    subject: 'Subject of your message',
    message:
      'Tell me about your work opportunity, question, or how I can help you...',
  },
  buttons: {
    submit: 'Send Message',
    submitting: 'Sending...',
  },
  validation: {
    required: (field: string) => `${field} is required.`,
    invalidEmail: 'Please enter a valid email address.',
    messageTooShort: `Message must be at least ${FORM_VALIDATION.MIN_MESSAGE_LENGTH} characters long.`,
    subjectTooShort: `Subject must be at least ${FORM_VALIDATION.MIN_SUBJECT_LENGTH} characters long.`,
    captchaRequired: 'Please complete the reCAPTCHA verification.',
    genericError: 'An unexpected error occurred. Please try again.',
    networkError: 'Failed to send message. Please try again.',
  },
  success: {
    messageSent: "Message sent successfully! I'll get back to you soon.",
  },
  captcha: {
    ariaLabel: 'Complete the reCAPTCHA to verify you are human',
    helpText: 'Complete the verification above to send your message',
    errorText: 'reCAPTCHA configuration error: Site key not found',
    securityLabel: 'Security verification required to submit form',
  },
  accessibility: {
    requiredField: 'required field',
    formBeingSubmitted: 'Form is being submitted, please wait',
    completeCaptchaToSubmit:
      'Please complete all required fields and verification to submit',
    submittingForm: 'Submitting form',
  },
  autoComplete: {
    name: 'name',
    email: 'email',
    off: 'off',
  },
} as const;

// Resume Forms Content (if any resume-related forms exist)
export const RESUME_FORM_CONTENT = {
  buttons: {
    download: 'Download Resume',
    view: 'View Resume',
    viewFullscreen: 'View Full PDF',
    print: 'Print',
  },
  labels: {
    resumeType: 'Resume Type',
    downloadOptions: 'Download Options',
  },
  descriptions: {
    chooseAction: 'Choose an action below to view or download the resume.',
    pdfDocument: 'PDF Document',
  },
  fileInfo: {
    format: 'Format',
    fileSize: 'File Size',
    lastUpdated: 'Last Updated',
    updated: (date: string) => `Updated ${date}`,
  },
  accessibility: {
    previewAndActions: (title: string) => `${title} preview and actions`,
  },
} as const;

// Generic Form Content
export const GENERIC_FORM_CONTENT = {
  buttons: {
    submit: 'Submit',
    cancel: 'Cancel',
    reset: 'Reset',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
  },
  states: {
    loading: 'Loading...',
    saving: 'Saving...',
    submitting: 'Submitting...',
    processing: 'Processing...',
    success: 'Success!',
    error: 'Error occurred',
  },
  validation: {
    required: 'This field is required.',
    invalid: 'Please enter a valid value.',
    tooShort: (min: number) => `Must be at least ${min} characters.`,
    tooLong: (max: number) => `Must be no more than ${max} characters.`,
  },
  accessibility: {
    required: 'required',
    optional: 'optional',
    invalid: 'invalid',
    valid: 'valid',
  },
} as const;
