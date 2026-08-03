// Central type definitions for the portfolio application

// Contact Form Types
export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  readonly className?: string;
}

// Project Types
export interface ProjectData {
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt?: string;
  priority?: boolean;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  /** Hue (0–360) driving the card's gradient header */
  hue?: number;
  /** Short mono "// tag" label shown on the card header */
  tag?: string;
}

// Social Profile Types
export interface SocialProfile {
  platform: 'linkedin' | 'github' | 'leetcode';
  name: string;
  username: string;
  headline: string;
  profileUrl: string;
  details: SocialProfileDetail[];
  stats?: SocialProfileStat[];
}

export interface SocialProfileDetail {
  label: string;
  value: string;
}

export interface SocialProfileStat {
  label: string;
  value: string | number;
  icon?: string;
}

// API Response Types
export interface ContactAPIResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Common Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface Certificate {
  readonly title: string;
  readonly provider: string;
  readonly year: string;
  readonly month?: string;
  readonly filePath?: string;
  readonly linkedinUrl?: string;
  readonly description?: string;
}
