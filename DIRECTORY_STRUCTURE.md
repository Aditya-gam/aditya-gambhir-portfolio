# Directory Structure & Organization

This document outlines the modernized directory structure and coding standards implemented for better maintainability and scalability.

## 📁 Project Structure

```
aditya-gambhir-portfolio/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/               # API routes
│   │   ├── contact/           # Contact page
│   │   ├── projects/          # Projects page
│   │   ├── resume/            # Resume page
│   │   ├── globals.css        # Global styles with modular imports
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── forms/             # Form-related components
│   │   │   ├── FormField.tsx  # Reusable form field
│   │   │   ├── CaptchaField.tsx # reCAPTCHA component
│   │   │   └── SubmitButton.tsx # Submit button with loading
│   │   ├── ui/                # UI primitives
│   │   ├── ContactForm.tsx    # Refactored contact form
│   │   ├── Header.tsx         # Site header
│   │   ├── Footer.tsx         # Site footer
│   │   ├── MobileNav.tsx      # Mobile navigation
│   │   └── ProjectCard.tsx    # Project display card
│   ├── hooks/                 # Custom React hooks
│   │   ├── useContactForm.ts  # Contact form logic
│   │   └── useFormValidation.ts # Form validation logic
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Centralized types
│   ├── constants/             # Application constants
│   │   └── index.ts           # Constants and configuration
│   ├── config/                # Configuration files
│   │   └── env.ts             # Environment variables
│   ├── data/                  # Static data and content
│   │   └── projects.ts        # Project information
│   ├── lib/                   # Utility libraries
│   │   ├── mongodb.ts         # Database connection
│   │   └── utils.ts           # Utility functions
│   └── styles/                # CSS modules
│       ├── base.css           # Base styles
│       ├── components.css     # Component styles
│       └── layout.css         # Layout styles
├── public/                    # Static assets
├── docs/                      # Documentation
└── package.json               # Dependencies and scripts
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Pure UI components focused on presentation
- **Hooks**: Business logic and state management
- **Types**: Centralized TypeScript definitions
- **Constants**: Configuration and static values
- **Data**: Static content and mock data

### 2. **Modular CSS Architecture**
- **base.css**: Foundation styles and utilities
- **components.css**: Component-specific styles
- **layout.css**: Layout and grid systems
- **globals.css**: Imports and global overrides

### 3. **Component Organization**
- **Feature-based grouping**: Related components grouped together (e.g., `forms/`)
- **Single responsibility**: Each component has one clear purpose
- **Reusable primitives**: Common UI elements in `ui/` folder

## 🔧 Key Improvements Made

### Before Refactoring
- ❌ Single 285-line ContactForm component
- ❌ Hardcoded project data in components
- ❌ Mixed CSS in single file
- ❌ Scattered type definitions
- ❌ Inline constants and magic numbers

### After Refactoring
- ✅ **ContactForm**: 70 lines (75% reduction)
- ✅ **Reusable components**: FormField, CaptchaField, SubmitButton
- ✅ **Custom hooks**: useContactForm, useFormValidation
- ✅ **Centralized data**: projects.ts for easy content management
- ✅ **Modular CSS**: Organized by purpose and feature
- ✅ **Type safety**: Centralized TypeScript definitions
- ✅ **Environment management**: Centralized env configuration

## 📋 Development Guidelines

### Component Guidelines
```typescript
// ✅ Good: Single responsibility, typed props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

### Hook Guidelines
```typescript
// ✅ Good: Business logic separated from UI
export function useContactForm() {
  // State and logic
  const [formData, setFormData] = useState<FormData>({...});
  
  // Return interface
  return {
    formData,
    handleSubmit,
    errors,
  };
}
```

### CSS Guidelines
```css
/* ✅ Good: BEM-like naming, utility classes */
.form-field {
  @apply space-y-2;
}

.form-input {
  @apply w-full px-3 py-2 border rounded-lg;
}

.form-input-error {
  @apply border-destructive;
}
```

## 🚀 Benefits Achieved

1. **Maintainability**: Smaller, focused files are easier to understand and modify
2. **Reusability**: Components and hooks can be reused across the application
3. **Type Safety**: Centralized types prevent inconsistencies
4. **Testability**: Isolated functions and components are easier to test
5. **Scalability**: Clear structure supports future feature additions
6. **Developer Experience**: Better IDE support and faster development

## 📈 Next Steps

1. **Testing**: Add unit tests for hooks and components
2. **Documentation**: Add JSDoc comments to complex functions
3. **Performance**: Implement lazy loading for non-critical components
4. **Accessibility**: Audit and improve ARIA attributes
5. **SEO**: Enhance meta tags and structured data

## 🔍 File Size Comparison

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| ContactForm.tsx | 285 lines | 70 lines | 75% |
| Total Components | 1 large file | 6 focused files | Better organization |
| CSS Files | 2 files | 4 modular files | Better separation |

This refactoring establishes a solid foundation for continued development while following modern React and Next.js best practices. 