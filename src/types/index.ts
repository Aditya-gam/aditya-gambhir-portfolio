// Central type definitions for the portfolio application

// Contact Form Types
export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name: string;
  email: string;
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
  imageAlt: string;
  priority?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
}

// API Response Types
export interface ContactAPIResponse {
  success: boolean;
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
