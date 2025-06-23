# CSS Architecture & Standardization Guide

## Overview

This document outlines the standardized CSS architecture for the Aditya Gambhir Portfolio project, following modern Next.js best practices and industry standards.

## Architecture Principles

### 1. **Utility-First Approach**

- Prefer Tailwind CSS utilities over custom CSS classes
- Use custom CSS classes only when Tailwind cannot achieve the desired design
- Follow the principle of "composition over configuration"

### 2. **Design System Compliance**

- All colors use CSS custom properties (design tokens)
- Consistent spacing, typography, and component patterns
- WCAG 2.1 AA accessibility compliance

### 3. **Single Source of Truth**

- One global focus management system
- Centralized color system using CSS variables
- Consistent component variants using `cva`

## File Structure

```
src/
├── app/
│   └── globals.css          # Global styles, CSS variables, base layer
├── styles/
│   ├── base.css            # Layout patterns and utilities
│   └── components.css      # Component-specific styles
└── components/
    └── ui/                 # Reusable UI components with cva variants
```

## CSS Layer Organization

### 1. **globals.css** - Foundation Layer

- **CSS Variables**: Design system tokens for colors, spacing, typography
- **Base Styles**: Global reset, focus management, accessibility
- **Utility Classes**: Scrollbar, skip links, global utilities

### 2. **base.css** - Layout Layer

- **Containers**: Page and section layouts
- **Grid Systems**: Responsive grid patterns
- **Navigation**: Header, footer, mobile nav layouts
- **Forms**: Form structure and spacing

### 3. **components.css** - Component Layer

- **Cards**: Various card styles with consistent patterns
- **Typography**: Semantic heading and text styles
- **Forms**: Input, label, error styling
- **Navigation**: Link states and interactions

## Design System Colors

### Color Usage Guidelines

```css
/* ✅ CORRECT - Use design system colors */
.text-foreground
.text-muted-foreground
.bg-primary
.border-input
.hover:bg-accent

/* ❌ INCORRECT - Avoid hardcoded colors */
.text-gray-600
.bg-blue-500
.border-gray-300
.hover:bg-gray-100
```

### Color Tokens

| Token                | Purpose            | Light Mode            | Dark Mode             |
| -------------------- | ------------------ | --------------------- | --------------------- |
| `--foreground`       | Primary text       | `oklch(0.145 0 0)`    | `oklch(0.985 0 0)`    |
| `--muted-foreground` | Secondary text     | `oklch(0.556 0 0)`    | `oklch(0.708 0 0)`    |
| `--primary`          | Brand color        | `oklch(0.4 0.15 264)` | `oklch(0.7 0.15 264)` |
| `--muted`            | Subtle backgrounds | `oklch(0.97 0 0)`     | `oklch(0.269 0 0)`    |

## Component Patterns

### Buttons

Use the standardized Button component with cva variants:

```tsx
import { Button } from '@/components/ui/button';

// ✅ Preferred approach
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>

// ❌ Avoid inline styles
<button className="inline-flex items-center...">
```

### Cards

Use consistent card patterns:

```tsx
// ✅ Standard card pattern
<div className="card-interactive">
  <h3 className="heading-card">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Forms

Follow the standardized form structure:

```tsx
<div className="form-field">
  <label className="form-label">Label</label>
  <input className="form-input" />
  <p className="form-error">Error message</p>
</div>
```

## Focus Management

### Single Focus System

All interactive elements use consistent focus styling:

```css
/* Global focus ring - applied automatically */
:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
```

### Guidelines

- Never use `outline: none` without providing alternative focus indication
- Use `focus-visible` instead of `focus` for better UX
- Ensure minimum 3px ring width for accessibility

## Accessibility Standards

### Color Contrast

- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text
- All color combinations tested with WCAG standards

### Touch Targets

- Minimum 44x44px touch target size
- Applied via `.touch-target` utility class

### Semantic HTML

- Use semantic heading hierarchy
- Proper form labeling and error association
- Screen reader friendly text and landmarks

## Migration Guidelines

### Replacing Old Patterns

```css
/* ❌ Old pattern */
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

/* ✅ New pattern */
<Button variant="default">Action</Button>
```

### Color System Migration

```tsx
// ❌ Old hardcoded colors
className = 'text-gray-600 dark:text-gray-400';

// ✅ New design system colors
className = 'text-muted-foreground';
```

## Performance Optimizations

### CSS-in-JS Avoidance

- Use CSS classes instead of inline styles
- Leverage Tailwind's purging for smaller bundle sizes
- Minimize custom CSS to reduce complexity

### Bundle Size

- Remove unused CSS classes
- Use component variants over multiple similar classes
- Leverage Tailwind's tree-shaking capabilities

## Development Workflow

### Adding New Components

1. **Check existing patterns** - Don't reinvent existing solutions
2. **Use design system colors** - Never hardcode colors
3. **Follow accessibility guidelines** - Test with screen readers
4. **Document new patterns** - Update this guide if needed

### Testing Standards

- **Visual regression testing** - Ensure consistent appearance
- **Accessibility testing** - WCAG 2.1 AA compliance
- **Cross-browser testing** - Support modern browsers
- **Mobile responsiveness** - Test on various screen sizes

## Best Practices Summary

### ✅ Do's

- Use design system colors consistently
- Leverage Tailwind utilities for spacing and layout
- Follow semantic HTML practices
- Test accessibility thoroughly
- Document custom patterns

### ❌ Don'ts

- Hardcode colors or spacing values
- Create duplicate CSS classes
- Use inline styles for complex styling
- Ignore focus management
- Skip accessibility testing

## Future Considerations

### Scalability

- Consider CSS-in-TS solutions for larger applications
- Implement automated design token generation
- Add visual regression testing pipeline

### Maintenance

- Regular audit of unused CSS
- Update design tokens as brand evolves
- Keep accessibility standards current

---

This architecture ensures maintainable, scalable, and accessible CSS that follows modern web development best practices while providing an excellent user experience across all devices and assistive technologies.
