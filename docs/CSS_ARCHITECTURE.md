# CSS Architecture & Design System Guide

## 🎨 Overview

This document outlines the comprehensive CSS architecture for the Aditya Gambhir Portfolio, built on **Tailwind CSS 4.0** with modern design system principles. The architecture follows a component-first approach with systematic color tokens, responsive design patterns, and accessibility compliance.

## 🌟 Architecture Principles

### 1. **Modern Design System**
- **Tailwind CSS 4.0** with `@theme` syntax for design tokens
- **OKLCH Color Space** for perceptually uniform colors and better dark mode
- **Component Variants** using `class-variance-authority` for type-safe styling
- **CSS Custom Properties** for runtime theming and design token management

### 2. **Performance-First Approach**
- **CSS-in-CSS** approach with minimal runtime overhead
- **Automatic color space conversion** for better browser support
- **Optimized bundle sizes** with Tailwind's built-in purging
- **Critical CSS inlining** for above-the-fold content

### 3. **Accessibility & Standards**
- **WCAG 2.1 AA compliance** with proper contrast ratios
- **Touch-friendly interfaces** with minimum 44px touch targets
- **Semantic color naming** for better maintainability
- **Focus management** with consistent visual indicators

## 📁 File Structure

```
src/
├── app/
│   └── globals.css             # Tailwind CSS 4.0 theme configuration
├── styles/
│   ├── base.css               # Layout patterns & utilities
│   └── components.css         # Component-specific styles
└── components/
    └── ui/                    # Design system components with variants
```

## 🎨 Tailwind CSS 4.0 Design System

### **Theme Configuration**

**Location**: `src/app/globals.css`

```css
@theme {
  /* Colors - Creative Purple Theme */
  --color-background: oklch(99% 0.004 280);
  --color-foreground: oklch(17% 0.03 300);
  --color-card: oklch(99% 0.004 280);
  --color-card-foreground: oklch(17% 0.03 300);
  --color-popover: oklch(99% 0.004 280);
  --color-popover-foreground: oklch(17% 0.03 300);
  --color-primary: oklch(58% 0.17 290);
  --color-primary-foreground: oklch(99% 0.004 280);
  --color-secondary: oklch(95% 0.004 280);
  --color-secondary-foreground: oklch(17% 0.03 300);
  --color-muted: oklch(95% 0.004 280);
  --color-muted-foreground: oklch(46% 0.02 300);
  --color-accent: oklch(90% 0.05 250);
  --color-accent-foreground: oklch(17% 0.03 300);
  --color-destructive: oklch(60.2% 0.15 12);
  --color-destructive-foreground: oklch(99% 0.004 280);
  --color-border: oklch(88% 0.004 280);
  --color-input: oklch(88% 0.004 280);
  --color-ring: oklch(58% 0.17 290);

  /* Border radius */
  --radius: 0.75rem;

  /* Fonts */
  --font-sans: 'DM Sans', system-ui, sans-serif;
}
```

### **Dark Mode Support**

```css
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(6% 0.03 300);
    --color-foreground: oklch(97% 0.004 280);
    --color-card: oklch(6% 0.03 300);
    --color-card-foreground: oklch(97% 0.004 280);
    --color-primary: oklch(64% 0.17 290);
    --color-primary-foreground: oklch(6% 0.03 300);
    --color-secondary: oklch(20% 0.03 300);
    --color-muted: oklch(20% 0.03 300);
    --color-muted-foreground: oklch(68% 0.02 300);
    --color-accent: oklch(26% 0.05 250);
    --color-border: oklch(20% 0.03 300);
    --color-input: oklch(20% 0.03 300);
    --color-ring: oklch(64% 0.17 290);
  }
}
```

## 🏗️ Component Architecture

### **Design System Components**

#### **Button Variants (CVA-Powered)**

**Location**: `src/components/ui/button.tsx`

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-w-[44px] min-h-[44px]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);
```

#### **Card System**

**Location**: `src/components/ui/card.tsx`

```typescript
// Base card with consistent styling
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);
```

### **Component-Specific Styles**

#### **Certificate Modal**

```css
.certificates-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
}

.certificates-scroll::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.certificates-scroll::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  opacity: 0;
  transition: all 0.3s ease;
}

.certificates-scroll:hover::-webkit-scrollbar-thumb {
  opacity: 1;
}
```

#### **Resume Preview Cards**

```css
.resume-preview-card {
  @apply bg-card text-card-foreground border rounded-lg shadow-sm hover:shadow-md transition-all duration-300;
}

.pdf-preview-container {
  @apply relative w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700;
}

.pdf-preview-container:hover {
  @apply border-primary/50 shadow-lg;
}
```

## 📱 Layout System

### **Responsive Design Patterns**

#### **Layout Containers**

```css
/* Base Layout Styles */
.page-layout {
  @apply container mx-auto px-4 py-8 max-w-4xl pt-20;
}

.container-narrow {
  @apply container mx-auto px-4 py-8 max-w-4xl;
}

.container-wide {
  @apply container mx-auto px-4 py-8 max-w-7xl;
}
```

#### **Grid Systems**

```css
/* Responsive Grid Layouts */
.grid-highlights {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}

.grid-projects {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0;
}

.grid-skills {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}

.grid-resume {
  @apply grid gap-6 md:grid-cols-2 max-w-4xl mx-auto;
}
```

#### **Content Sections**

```css
/* Consistent Section Spacing */
.content-section {
  @apply mb-12;
}

.content-section-lg {
  @apply mb-16;
}

.hero-section {
  @apply text-center mb-16;
}
```

### **Interactive Components**

#### **Navigation Patterns**

```css
/* Mobile Navigation */
.mobile-nav-overlay {
  @apply fixed inset-0 z-[100] bg-black/60 backdrop-blur-md;
}

.mobile-nav-content {
  @apply fixed inset-y-0 left-0 z-[101] h-full w-3/4 max-w-sm bg-background border-r shadow-2xl;
}

/* Header with Scroll Effects */
.header-backdrop {
  backdrop-filter: blur(var(--blur-amount, 0px));
  background-color: hsl(var(--background) / var(--bg-opacity, 0.95));
  transition: backdrop-filter 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
```

#### **Form Components**

```css
/* Modern Form Styling */
.form-input {
  @apply w-full px-3 py-2 border border-input rounded-lg shadow-sm bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-ring;
}

.form-input-error {
  @apply border-destructive focus-visible:ring-destructive;
}

.form-error {
  @apply mt-1 text-sm text-destructive;
}
```

## 🎨 Color System Usage

### **Design Token Guidelines**

```css
/* ✅ CORRECT - Use design system colors */
.text-foreground          /* Primary text */
.text-muted-foreground    /* Secondary text */
.bg-primary              /* Brand color backgrounds */
.border-input            /* Form borders */
.hover:bg-accent         /* Hover states */

/* ❌ INCORRECT - Avoid hardcoded colors */
.text-gray-600
.bg-blue-500
.border-gray-300
.hover:bg-gray-100
```

### **Color Token Reference**

| Token | Purpose | Light Mode | Dark Mode |
|-------|---------|------------|-----------|
| `background` | Page background | Light cream | Dark charcoal |
| `foreground` | Primary text | Dark purple | Light cream |
| `primary` | Brand color | Purple | Lighter purple |
| `muted` | Subtle backgrounds | Light gray | Dark gray |
| `accent` | Interactive elements | Light purple | Dark purple |
| `border` | Element borders | Medium gray | Dark gray |
| `destructive` | Error states | Red | Dark red |

## 🎭 Animation & Transitions

### **Motion System**

#### **Framer Motion Patterns**

```typescript
// Consistent animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};
```

#### **CSS Transitions**

```css
/* Standard Transition Patterns */
.transition-standard {
  @apply transition-all duration-200 ease-in-out;
}

.transition-smooth {
  @apply transition-all duration-300 ease-in-out;
}

.transition-slow {
  @apply transition-all duration-500 ease-in-out;
}
```

### **Interactive States**

```css
/* Hover & Focus States */
.card-interactive {
  @apply hover:shadow-md hover:border-primary/50 transition-all duration-200;
}

.button-interactive {
  @apply hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150;
}
```

## ♿ Accessibility Standards

### **Focus Management**

```css
/* Global Focus System */
:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}

/* Skip Links */
.skip-link {
  @apply absolute -top-40 left-6 z-[200] bg-background px-4 py-2 text-foreground transition-all focus:top-6;
}
```

### **Touch Targets**

```css
/* Minimum Touch Target Size */
.touch-target {
  @apply min-w-[44px] min-h-[44px] flex items-center justify-center;
}
```

### **Screen Reader Support**

```css
/* Visually Hidden */
.sr-only-heading {
  @apply sr-only;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

## 📱 Responsive Design

### **Breakpoint System**

```css
/* Mobile: 320px+ (default) */
.component-mobile

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .component-tablet
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .component-desktop
}

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) {
  .component-xl
}
```

### **Mobile Optimizations**

```css
/* Touch-Friendly Navigation */
.mobile-nav-trigger {
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  @apply p-3 -m-3; /* Larger touch area */
}

/* Smooth Scrolling on Mobile */
.mobile-scroll-container {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
```

## 🎯 Component Styling Patterns

### **About Page Components**

#### **Certification Cards**

```css
.certificate-card {
  @apply p-4 shadow-sm min-w-80 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-l-4 border-l-indigo-500;
}
```

#### **Dual Expertise Cards**

```css
.expertise-card-ds {
  @apply bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center;
}

.expertise-card-sde {
  @apply bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center;
}
```

### **Project Components**

```css
.project-card {
  @apply bg-card text-card-foreground border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4;
}

.project-tech-tag {
  @apply px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20;
}
```

## 🔄 Migration Guidelines

### **Tailwind CSS 3.x to 4.0**

#### **Before (3.x)**
```css
:root {
  --primary: 212 100% 50%;
}

.bg-primary {
  background-color: hsl(var(--primary));
}
```

#### **After (4.0)**
```css
@theme {
  --color-primary: oklch(58% 0.17 290);
}

.bg-primary {
  background-color: var(--color-primary);
}
```

### **Color System Migration**

#### **Old Approach**
```css
/* Hardcoded HSL values */
.text-gray-600 { color: hsl(220, 9%, 46%); }
.bg-blue-500 { background: hsl(217, 91%, 60%); }
```

#### **New Approach**
```css
/* Design system tokens */
.text-muted-foreground { color: var(--color-muted-foreground); }
.bg-primary { background: var(--color-primary); }
```

## 🛠️ Development Workflow

### **Adding New Components**

1. **Define variant types** using `class-variance-authority`
2. **Use design system colors** exclusively
3. **Include focus and hover states**
4. **Test accessibility** with screen readers
5. **Verify responsive behavior** across breakpoints

### **CSS Organization**

```typescript
// Component with CVA variants
const componentVariants = cva(
  "base-classes", // Base styles always applied
  {
    variants: {
      variant: {
        default: "default-variant-classes",
        secondary: "secondary-variant-classes",
      },
      size: {
        sm: "small-size-classes",
        lg: "large-size-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);
```

### **Performance Monitoring**

```bash
# Check CSS bundle size
npm run build:analyze

# Audit unused CSS (Tailwind handles this automatically)
npx tailwindcss --input src/app/globals.css --output dist/output.css --minify
```

## 📊 Performance Optimizations

### **CSS Loading Strategy**

1. **Critical CSS** inlined in `<head>`
2. **Component CSS** loaded on-demand
3. **Font loading** optimized with `font-display: swap`
4. **Unused CSS** automatically purged by Tailwind

### **Bundle Size Management**

- **Tailwind CSS 4.0** tree-shaking eliminates unused styles
- **Component variants** generate minimal CSS output
- **Custom properties** reduce duplication
- **Modern CSS features** reduce JavaScript overhead

---

This CSS architecture provides a scalable, maintainable, and performant foundation for the portfolio website while leveraging the latest Tailwind CSS 4.0 features and modern CSS best practices.
