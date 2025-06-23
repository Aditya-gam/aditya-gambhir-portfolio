# Content Management Guide

## 📝 Overview

This guide explains how to manage and update content in the Aditya Gambhir Portfolio website, including projects, personal information, resume files, and static assets.

## 🎯 Project Management

### Adding New Projects

**Location**: `src/data/projects.ts`

```typescript
// Add new project to the array
export const allProjects: ProjectData[] = [
  // ... existing projects
  {
    title: "New Project Name",
    description: "Brief description of the project and its purpose.",
    bullets: ["Key Feature 1", "Key Feature 2", "Key Feature 3"],
    imageSrc: "/projects/new-project.svg",
    imageAlt: "New Project screenshot showing main interface",
    priority: false, // Set to true for featured projects
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    githubUrl: "https://github.com/username/new-project",
    liveUrl: "https://new-project.vercel.app"
  }
];
```

### Project Image Guidelines

**Image Requirements**:
- **Format**: SVG preferred, PNG/WebP acceptable
- **Size**: 400x300px minimum
- **Location**: `/public/projects/`
- **Naming**: `project-name.svg` (kebab-case)

**Adding Project Images**:
1. Optimize image using tools like [SVGOMG](https://jakearchibald.github.io/svgomg/)
2. Place in `/public/projects/` directory
3. Update `imageSrc` in project data
4. Add descriptive `imageAlt` text

### Project Categories

```typescript
// Filter projects by technology
const reactProjects = getProjectsByTechnology('React');
const dataProjects = getProjectsByTechnology('Python');

// Get featured projects only
const featured = getFeaturedProjects();

// Get all projects
const all = getAllProjects();
```

## 📄 Resume Management

### Resume Files

**Location**: `/public/`

- `Aditya_Gambhir_SDE.pdf` - Software Engineer resume
- `Aditya_Gambhir_DS.pdf` - Data Scientist resume

### Updating Resume Files

1. **Replace existing files** with same filename
2. **Ensure file size** is under 5MB for fast loading
3. **Test download links** after update
4. **Update lastModified** date in sitemap if needed

### Resume Download Links

**Usage in components**:
```tsx
// Download links are automatically generated
<a 
  href="/Aditya_Gambhir_SDE.pdf" 
  download="Aditya_Gambhir_Resume.pdf"
  className="btn-download"
>
  Download SDE Resume
</a>
```

## 🖼️ Image Assets

### Profile Images

**Current Files**:
- `headshot.webp` - Optimized profile image (primary)
- `headshot.jpg` - Fallback profile image
- `headshot1.webp` - Alternative profile image

### Image Optimization

```bash
# Convert to WebP format
npx @squoosh/cli --webp '{"quality":80}' headshot.jpg

# Resize images
npx @squoosh/cli --resize '{"enabled":true,"width":400}' headshot.jpg

# Optimize existing images
npx @squoosh/cli --webp '{"quality":90}' --resize '{"enabled":true,"width":800}' *.jpg
```

### Image Usage Guidelines

```tsx
// Use Next.js Image component for optimization
import Image from 'next/image';

<Image
  src="/headshot.webp"
  alt="Aditya Gambhir - Software Engineer & Data Scientist"
  width={400}
  height={400}
  priority // For above-the-fold images
  className="rounded-full"
/>
```

## 🔧 Configuration Updates

### Personal Information

**Location**: `src/constants/index.ts`

```typescript
// Update personal details
export const PERSONAL_INFO = {
  NAME: "Aditya Gambhir",
  TITLE: "Software Engineer & Data Scientist",
  EMAIL: "gambhir.aditya19@gmail.com",
  LOCATION: "Your Location",
} as const;

// Update social links
export const SOCIAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/aditya-gambhir',
  GITHUB: 'https://github.com/Aditya-gam',
  TWITTER: 'https://twitter.com/your-handle', // Optional
} as const;
```

### Site Metadata

**Location**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Aditya Gambhir | Software Engineer & Data Scientist',
    template: '%s | Aditya Gambhir',
  },
  description: 'Update your professional description here',
  keywords: [
    'Your Name',
    'Your Skills',
    'Your Technologies',
    // ... add relevant keywords
  ],
  // ... other metadata
};
```

## 📱 Navigation Updates

### Adding New Pages

1. **Create page file** in `src/app/new-page/page.tsx`
2. **Update navigation** in `src/constants/index.ts`:

```typescript
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'New Page', href: '/new-page' }, // Add here
  { label: 'Contact', href: '/contact' },
] as const;
```

3. **Update sitemap** in `src/app/sitemap.ts`:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ... existing pages
    {
      url: `${baseUrl}/new-page`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```

## 🎨 Styling Updates

### Color Scheme

**Location**: `src/app/globals.css`

```css
:root {
  /* Update brand colors */
  --primary: 212 100% 50%; /* Your brand color */
  --primary-foreground: 0 0% 100%;
  
  /* Update accent colors */
  --accent: 210 40% 98%;
  --accent-foreground: 222.2 84% 4.9%;
}

[data-theme="dark"] {
  /* Dark mode colors */
  --primary: 212 100% 60%;
  --background: 222.2 84% 4.9%;
}
```

### Custom CSS Classes

**Location**: `src/styles/components.css`

```css
/* Add new component styles */
.new-component {
  @apply bg-primary text-primary-foreground rounded-lg p-4;
}

/* Update existing styles */
.card-project {
  @apply bg-card text-card-foreground rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow;
}
```

## 📊 Analytics & Tracking

### Google Analytics Setup

1. **Add GA tracking ID** to environment variables:
```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

2. **Update tracking configuration** in `src/lib/gtag.ts`:
```typescript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Track page views
export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track events
export const event = (action: string, parameters: any) => {
  gtag('event', action, parameters);
};
```

### Contact Form Analytics

**Track form submissions**:
```typescript
// In contact form component
import { event } from '@/lib/gtag';

const handleSubmit = async (e: React.FormEvent) => {
  // ... form submission logic
  
  if (response.ok) {
    // Track successful submission
    event('form_submit', {
      form_name: 'contact',
      success: true
    });
  }
};
```

## 🔒 Security Updates

### Environment Variables

**Update production environment variables**:
1. **Vercel Dashboard** → Project Settings → Environment Variables
2. **Update sensitive keys** regularly:
   - `RECAPTCHA_SECRET_KEY`
   - `EMAIL_PASS`
   - `MONGODB_URI`

### Content Security Policy

**Update CSP headers** in `next.config.ts`:
```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

## 📝 Content Writing Guidelines

### Project Descriptions

**Structure**:
1. **What**: Brief description of what the project does
2. **Why**: Problem it solves or value it provides
3. **How**: Key technologies and approach used

**Example**:
```
A full-stack task management application that helps teams organize and track project progress. Built to solve collaboration challenges in remote work environments using React, Node.js, and MongoDB with real-time updates via WebSocket connections.
```

### Technical Writing

**Best Practices**:
- Use clear, concise language
- Avoid jargon unless necessary
- Include specific technologies and versions
- Highlight unique features and achievements
- Quantify results when possible

### SEO Optimization

**Keywords to include**:
- Your name and professional title
- Technologies you specialize in
- Industry-specific terms
- Location (if relevant for local opportunities)

## 🔄 Content Maintenance

### Regular Updates

**Monthly Tasks**:
- [ ] Review and update project descriptions
- [ ] Add new projects to portfolio
- [ ] Update resume files if needed
- [ ] Check and fix broken links
- [ ] Update dependencies and security patches

**Quarterly Tasks**:
- [ ] Review and update personal information
- [ ] Update professional headshot if needed
- [ ] Review and optimize site performance
- [ ] Update technology skills and keywords
- [ ] Review analytics and adjust content strategy

### Content Backup

**Important files to backup**:
- `/src/data/projects.ts` - Project information
- `/src/constants/index.ts` - Site configuration
- `/public/Aditya_Gambhir_*.pdf` - Resume files
- `/public/headshot.*` - Profile images

## 🚀 Content Deployment

### Testing Content Changes

```bash
# Test locally before deploying
npm run dev

# Build and test production version
npm run build
npm start

# Check for broken links and images
# Verify form functionality
# Test responsive design
```

### Deployment Process

1. **Make content changes** in appropriate files
2. **Test changes locally** using `npm run dev`
3. **Commit changes** with descriptive messages
4. **Push to GitHub** - triggers automatic deployment
5. **Verify live site** after deployment

This content management guide ensures your portfolio stays current, professional, and optimized for your career goals. 