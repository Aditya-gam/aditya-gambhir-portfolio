// Environment configuration - centralized environment variable management

export const env = {
  // reCAPTCHA Configuration
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,

  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI,

  // Email Configuration
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_TO: process.env.EMAIL_TO,

  // Site Configuration
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV,

  // Analytics (if needed in the future)
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
} as const;

// Validation functions for critical environment variables
export const validateEnv = () => {
  const requiredEnvVars = {
    RECAPTCHA_SITE_KEY: env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: env.RECAPTCHA_SECRET_KEY,
    MONGODB_URI: env.MONGODB_URI,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
  }
};

// Helper to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
