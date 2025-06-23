# Component Library Documentation

## 🎯 Overview

The Aditya Gambhir Portfolio uses a modular component architecture with reusable UI components, form components, and layout components. This document provides comprehensive documentation for all components in the system.

## 📁 Component Organization

```
src/components/
├── ui/                    # Base UI primitives
│   ├── button.tsx         # Button component with variants
│   ├── card.tsx          # Card container component
│   └── dropdown-menu.tsx  # Dropdown menu primitive
├── forms/                 # Form-specific components
│   ├── FormField.tsx     # Reusable form field wrapper
│   ├── CaptchaField.tsx  # reCAPTCHA integration
│   └── SubmitButton.tsx  # Form submit button with loading
├── ContactForm.tsx        # Contact form container
├── Header.tsx            # Site navigation header
├── Footer.tsx            # Site footer
├── MobileNav.tsx         # Mobile navigation menu
└── ProjectCard.tsx       # Project display card
```

## 🎨 UI Components

### Button Component

**Location**: `src/components/ui/button.tsx`

A versatile button component built with `class-variance-authority` for type-safe variants.

#### Props Interface
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

#### Usage Examples
```tsx
import { Button } from '@/components/ui/button';

// Primary button
<Button variant="default">Primary Action</Button>

// Secondary button
<Button variant="outline">Secondary Action</Button>

// Large button
<Button size="lg">Large Button</Button>

// With custom styling
<Button className="w-full">Full Width Button</Button>
```

#### Variants
- **default**: Primary blue button
- **destructive**: Red danger button
- **outline**: Bordered button
- **secondary**: Gray secondary button
- **ghost**: Transparent button
- **link**: Text link styled as button

### Card Component

**Location**: `src/components/ui/card.tsx`

Container component for content grouping with consistent styling.

#### Sub-components
```typescript
const Card = React.forwardRef<HTMLDivElement, CardProps>(...)
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(...)
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(...)
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(...)
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(...)
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(...)
```

#### Usage Example
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Dropdown Menu Component

**Location**: `src/components/ui/dropdown-menu.tsx`

Accessible dropdown menu built on Radix UI primitives.

#### Usage Example
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## 📝 Form Components

### FormField Component

**Location**: `src/components/forms/FormField.tsx`

Reusable form field wrapper with label, input, and error display.

#### Props Interface
```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
}
```

#### Usage Example
```tsx
import FormField from '@/components/forms/FormField';

<FormField
  label="Full Name"
  name="name"
  type="text"
  value={formData.name}
  error={errors.name}
  placeholder="Enter your full name"
  required
  onChange={handleInputChange}
  onBlur={handleInputBlur}
/>
```

#### Features
- Automatic error styling
- Required field indicators
- Accessible label association
- Support for text inputs and textareas

### CaptchaField Component

**Location**: `src/components/forms/CaptchaField.tsx`

Google reCAPTCHA integration component with error handling.

#### Props Interface
```typescript
interface CaptchaFieldProps {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  onChange: (token: string | null) => void;
  onExpired: () => void;
  onError: () => void;
}
```

#### Usage Example
```tsx
import CaptchaField from '@/components/forms/CaptchaField';
import { useRef } from 'react';

const recaptchaRef = useRef<ReCAPTCHA>(null);

<CaptchaField
  recaptchaRef={recaptchaRef}
  onChange={handleCaptchaChange}
  onExpired={handleCaptchaExpired}
  onError={handleCaptchaError}
/>
```

### SubmitButton Component

**Location**: `src/components/forms/SubmitButton.tsx`

Form submission button with loading state and validation feedback.

#### Props Interface
```typescript
interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
```

#### Usage Example
```tsx
import SubmitButton from '@/components/forms/SubmitButton';

<SubmitButton loading={submitting} disabled={!captchaToken}>
  Send Message
</SubmitButton>
```

#### Features
- Loading spinner animation
- Disabled state styling
- Accessible loading announcements

## 🏗️ Layout Components

### Header Component

**Location**: `src/components/Header.tsx`

Main site navigation header with responsive design.

#### Features
- Desktop navigation menu
- Mobile hamburger menu
- Logo/brand area
- Responsive breakpoints
- Sticky positioning

#### Navigation Items
```typescript
const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];
```

#### Usage
```tsx
// Automatically included in layout.tsx
import Header from '@/components/Header';

<Header />
```

### Footer Component

**Location**: `src/components/Footer.tsx`

Site footer with social links and copyright information.

#### Features
- Social media links
- Copyright notice
- Responsive layout
- Lazy loaded for performance

#### Usage
```tsx
// Automatically included in layout.tsx via dynamic import
const Footer = dynamic(() => import('@/components/Footer'));
```

### MobileNav Component

**Location**: `src/components/MobileNav.tsx`

Mobile-specific navigation menu with slide-in animation.

#### Features
- Responsive mobile-only display
- Smooth slide animations
- Touch-friendly interface
- Keyboard navigation support

## 🎴 Content Components

### ProjectCard Component

**Location**: `src/components/ProjectCard.tsx`

Displays individual project information with consistent styling.

#### Props Interface
```typescript
interface ProjectCardProps {
  project: ProjectData;
  priority?: boolean;
}

interface ProjectData {
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
```

#### Usage Example
```tsx
import ProjectCard from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';

{featuredProjects.map((project) => (
  <ProjectCard
    key={project.title}
    project={project}
    priority={project.priority}
  />
))}
```

#### Features
- Responsive image loading
- Technology tag display
- External link handling
- Hover animations
- Accessibility optimized

### ContactForm Component

**Location**: `src/components/ContactForm.tsx`

Complete contact form with validation and submission handling.

#### Props Interface
```typescript
interface ContactFormProps {
  className?: string;
}
```

#### Usage Example
```tsx
import ContactForm from '@/components/ContactForm';

<ContactForm className="max-w-2xl mx-auto" />
```

#### Features
- Client-side validation
- Server-side submission
- reCAPTCHA integration
- Toast notifications
- Accessibility compliant
- Loading states

## 🎨 Styling Patterns

### CSS Classes

All components use standardized CSS classes from the modular stylesheets:

#### Card Variants
```css
.card-base        /* Basic card styling */
.card-interactive /* Hover effects */
.card-project     /* Project-specific styling */
.card-highlight   /* Highlighted cards */
```

#### Button Variants
```css
.btn-primary      /* Primary action button */
.btn-secondary    /* Secondary button */
.btn-download     /* Download button styling */
```

#### Form Styles
```css
.form-field       /* Form field container */
.form-label       /* Form labels */
.form-input       /* Input styling */
.form-error       /* Error message styling */
```

### Responsive Design

All components follow mobile-first responsive design:

```css
/* Mobile: 320px+ */
.component-mobile

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .component-tablet
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .component-desktop
}
```

## 🧪 Component Testing

### Testing Patterns

#### Basic Component Test
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-input');
  });
});
```

#### Form Component Test
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '@/components/forms/FormField';

describe('FormField', () => {
  const mockOnChange = jest.fn();

  it('calls onChange when input value changes', () => {
    render(
      <FormField
        label="Test Field"
        name="test"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Test Field');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledWith('test', 'new value');
  });
});
```

## 🔄 Component Updates

### Adding New Components

1. **Create component file** in appropriate directory
2. **Follow naming conventions**: PascalCase for components
3. **Add TypeScript interfaces** for props
4. **Include accessibility features** (ARIA labels, keyboard navigation)
5. **Add responsive styling** with mobile-first approach
6. **Create documentation** in this file
7. **Write tests** for component functionality

### Component Guidelines

#### Props Interface
```typescript
// Always define props interface
interface ComponentProps {
  // Required props first
  title: string;
  content: string;
  
  // Optional props with defaults
  variant?: 'default' | 'alternative';
  size?: 'sm' | 'md' | 'lg';
  
  // Event handlers
  onClick?: () => void;
  
  // Common props
  className?: string;
  children?: React.ReactNode;
}
```

#### Component Structure
```typescript
import React from 'react';
import { cn } from '@/lib/utils'; // Class name utility

interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({
  // Destructure props with defaults
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'base-classes',
        variant === 'alternative' && 'alternative-classes',
        className
      )}
      {...props}
    >
      {/* Component content */}
    </div>
  );
};

export default Component;
```

This component library provides the foundation for consistent, accessible, and maintainable UI development across the portfolio website. 