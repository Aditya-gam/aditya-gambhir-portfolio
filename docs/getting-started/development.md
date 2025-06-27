# Development Workflow Guide

## 🎯 Overview

This comprehensive guide establishes modern development practices for the Aditya Gambhir Portfolio project using **React 19**, **Next.js 15**, **TypeScript 5**, and **Tailwind CSS 4.0**. Ensures consistent code quality, efficient collaboration, and maintainable codebase with the latest tooling and standards.

## 🌿 Git Workflow

### Branch Strategy

```bash
main                    # Production-ready code
├── develop            # Integration branch (optional)
├── feature/contact-form    # New features
├── bugfix/form-validation  # Bug fixes
├── hotfix/security-patch   # Critical production fixes
└── docs/api-documentation  # Documentation updates
```

### Branch Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/project-gallery
feature/responsive-design

# Bug fixes
bugfix/contact-form-validation
bugfix/mobile-navigation
bugfix/image-optimization

# Hotfixes
hotfix/security-vulnerability
hotfix/api-rate-limiting

# Documentation
docs/setup-guide
docs/component-library

# Refactoring
refactor/css-architecture
refactor/api-structure
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting, etc.)
refactor: # Code refactoring
perf:     # Performance improvements
test:     # Adding or updating tests
chore:    # Maintenance tasks
ci:       # CI/CD configuration changes
build:    # Build system changes
```

#### Examples

```bash
feat(contact): add reCAPTCHA integration
fix(nav): resolve mobile menu not closing on route change
docs(api): update contact endpoint documentation
style(components): format button component with prettier
refactor(hooks): extract form validation logic to custom hook
perf(images): optimize project thumbnails for web
test(contact): add unit tests for form validation
chore(deps): update Next.js to version 15.3.4
```

## 📁 Project Structure Standards

### File Organization

```
src/
├── app/                    # Next.js App Router (pages & API)
├── components/             # React components
│   ├── ui/                # Reusable UI primitives
│   ├── forms/             # Form-specific components
│   └── [feature-components] # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries & configurations
├── types/                  # TypeScript type definitions
├── constants/              # Application constants
├── config/                 # Configuration files
├── data/                   # Static data files
├── styles/                 # CSS modules & stylesheets
└── utils/                  # Utility functions
```

### File Naming Conventions

```bash
# Components (PascalCase)
ContactForm.tsx
ProjectCard.tsx
SubmitButton.tsx

# Hooks (camelCase with 'use' prefix)
useContactForm.ts
useFormValidation.ts
useLocalStorage.ts

# Utilities (camelCase)
formatDate.ts
validateEmail.ts
sanitizeInput.ts

# Types (camelCase with descriptive suffix)
contactTypes.ts
projectTypes.ts
apiTypes.ts

# Constants (UPPER_SNAKE_CASE files, camelCase exports)
navigationConstants.ts
apiConstants.ts
validationConstants.ts

# Styles (kebab-case)
components.css
form-styles.css
responsive-utilities.css
```

## 💻 Development Environment

### Required Tools

```bash
# Node.js & Package Manager
node --version    # v18.17.0+
npm --version     # v9.0.0+

# Code Editor (VS Code recommended)
code --version

# Git
git --version

# Optional: Additional Tools
npx --version     # For running packages
```

### VS Code Configuration

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

`.vscode/extensions.json`:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🧹 Code Quality Standards

### ESLint Configuration

`eslint.config.mjs`:

```javascript
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextConfig from 'eslint-config-next';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('prettier'),
  {
    rules: {
      // Custom rules
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
```

### Prettier Configuration

`.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always"
}
```

### TypeScript Standards

#### Type Definitions

```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use types for unions and computed types
type Status = 'loading' | 'success' | 'error';
type UserKeys = keyof User;

// Props interfaces should be exported
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// Use generic types when appropriate
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
```

#### Component Typing

```typescript
// Functional components with props
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Components with refs
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', ...props }, ref) => {
    return <input ref={ref} type={type} {...props} />;
  }
);
```

## 🎨 CSS & Styling Standards

### Tailwind CSS Usage

```tsx
// ✅ Preferred: Use Tailwind utilities first
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ✅ Acceptable: Combine with custom CSS classes
<div className="card-base flex items-center">

// ❌ Avoid: Inline styles unless absolutely necessary
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### Custom CSS Organization

```css
/* Base layer - Global styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased;
  }
}

/* Components layer - Reusable patterns */
@layer components {
  .btn-primary {
    @apply inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500;
  }

  .card-base {
    @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
  }
}

/* Utilities layer - Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Component Styling Patterns

```tsx
// Use className utility for conditional classes
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        // Variant styles
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' &&
          'bg-gray-200 text-gray-900 hover:bg-gray-300',
        // Size styles
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Custom className
        className,
      )}
      {...props}
    />
  );
};
```

## 🧪 Testing Strategy

### Testing Pyramid

```
    🔺 E2E Tests (Cypress/Playwright)
   🔸🔸 Integration Tests (React Testing Library)
  🔹🔹🔹 Unit Tests (Jest + React Testing Library)
```

### Unit Testing Standards

```typescript
// Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200');
  });
});
```

### API Testing

```typescript
// API route testing
import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

describe('/api/contact', () => {
  it('validates required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: 'invalid-email',
        message: 'short',
        captchaToken: '',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.details).toContain('Name is required');
  });
});
```

## 🔄 Development Process

### Daily Workflow

1. **Start Development Session**

   ```bash
   # Pull latest changes
   git pull origin main

   # Create feature branch
   git checkout -b feature/new-feature

   # Start development server
   npm run dev
   ```

2. **During Development**

   ```bash
   # Run linter regularly
   npm run lint

   # Format code
   npm run format

   # Check types
   npx tsc --noEmit

   # Test changes
   npm test # when tests are added
   ```

3. **Before Commit**

   ```bash
   # Stage changes
   git add .

   # Run final checks
   npm run lint
   npm run format:check
   npm run build

   # Commit with conventional message
   git commit -m "feat(contact): add email validation"
   ```

4. **Push and PR**

   ```bash
   # Push feature branch
   git push origin feature/new-feature

   # Create pull request via GitHub
   # Include description, screenshots, testing notes
   ```

### Code Review Process

#### Pull Request Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?

- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Screenshots (if applicable)

Add screenshots to help explain your changes.

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] New and existing unit tests pass locally with my changes
```

#### Review Checklist

**Code Quality**

- [ ] Code follows established patterns and conventions
- [ ] Functions are small and single-purpose
- [ ] Variable and function names are descriptive
- [ ] No commented-out code or debugging statements
- [ ] Error handling is appropriate

**Performance**

- [ ] No unnecessary re-renders or computations
- [ ] Images are optimized and properly sized
- [ ] No memory leaks in useEffect hooks
- [ ] Bundle size impact is minimal

**Security**

- [ ] User inputs are validated and sanitized
- [ ] No sensitive data in client-side code
- [ ] API endpoints have proper authentication
- [ ] Dependencies are up to date and secure

**Accessibility**

- [ ] Proper semantic HTML structure
- [ ] ARIA labels where necessary
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards

**Testing**

- [ ] New features have corresponding tests
- [ ] Edge cases are covered
- [ ] Tests are meaningful and maintainable
- [ ] No flaky or overly complex tests

## 📦 Release Process

### Version Management

Use [Semantic Versioning](https://semver.org/):

```bash
# Major version (breaking changes)
1.0.0 → 2.0.0

# Minor version (new features)
1.0.0 → 1.1.0

# Patch version (bug fixes)
1.0.0 → 1.0.1
```

### Release Steps

1. **Pre-release Checklist**

   ```bash
   # Run full test suite
   npm test

   # Build and analyze
   npm run build:analyze

   # Security audit
   npm audit

   # Update dependencies
   npm update
   ```

2. **Create Release**

   ```bash
   # Update version in package.json
   npm version patch|minor|major

   # Create release notes
   git tag -a v1.0.1 -m "Release version 1.0.1"

   # Push changes and tags
   git push origin main --tags
   ```

3. **Deploy to Production**
   - Automatic deployment via Vercel
   - Monitor deployment status
   - Verify functionality in production
   - Monitor error rates and performance

This development workflow ensures high-quality, maintainable code while enabling efficient collaboration and reliable releases.
