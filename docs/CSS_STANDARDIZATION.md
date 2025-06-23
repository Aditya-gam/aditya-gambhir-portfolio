# CSS Standardization Strategy

This document outlines the CSS standardization and modularization approach implemented in the portfolio project.

## Overview

The project previously had inconsistent CSS classes scattered throughout components and pages. We've standardized common patterns into reusable CSS classes organized in separate files for better maintainability and consistency.

## File Structure

```
src/
├── styles/
│   ├── components.css    # Component-specific reusable styles
│   └── layouts.css       # Layout patterns and page structures
├── app/
│   └── globals.css       # Global styles (imports modular stylesheets)
```

## Modular Stylesheets

### 1. `src/styles/components.css`

Contains reusable component patterns:

#### Card Variants

- `.card-base` - Basic card styling with shadow and transitions
- `.card-interactive` - Interactive card with hover states
- `.card-highlight` - Highlighted card for important content
- `.card-project` - Specific styling for project cards

#### Button Variants

- `.btn-primary` - Primary action button (blue background)
- `.btn-secondary` - Secondary action button (outlined)
- `.btn-download` - Download button (full-width)

#### Text Styles

- `.text-muted` - Muted text color (gray)
- `.text-primary` - Primary text color
- `.text-hero` - Hero section text styling

#### Layout Grids

- `.grid-projects` - 2-column project grid layout
- `.grid-projects-3` - 3-column project grid layout
- `.grid-highlights` - 3-column highlights grid
- `.grid-resume` - Resume downloads grid

### 2. `src/styles/layouts.css`

Contains layout patterns and page structures:

#### Page Layouts

- `.page-layout` - Standard page container
- `.page-header` - Centered page header
- `.hero-section` - Hero section layout

#### Content Sections

- `.content-section` - Standard section spacing
- `.content-section-lg` - Large section spacing
- `.cta-section` - Call-to-action button layout

## Migration Examples

### Before (Original)

```jsx
<div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
  <h3 className="text-lg font-semibold mb-2">Title</h3>
  <p className="text-gray-600 dark:text-gray-300 mb-3">Description</p>
</div>
```

### After (Standardized)

```jsx
<div className="card-project">
  <h3 className="text-lg font-semibold mb-2">Title</h3>
  <p className="text-muted mb-3">Description</p>
</div>
```

## Benefits

1. **Consistency** - Unified design patterns across all components
2. **Maintainability** - Change styles in one place
3. **Developer Experience** - Semantic class names are easier to understand
4. **Performance** - Reduced CSS duplication
5. **Scalability** - Easy to add new variants or modify existing ones

## Usage Guidelines

### Class Naming Convention

- **Component classes**: `.card-*`, `.btn-*`, `.text-*`
- **Layout classes**: `.page-*`, `.section-*`, `.grid-*`
- **Utility classes**: `.mobile-*`, `.sr-only-*`

### Combining Classes

You can still combine standardized classes with additional Tailwind utilities:

```jsx
<div className="card-project mb-6">
  {/* Additional margin while using standard card */}
</div>
```

### Adding New Patterns

When you identify a new pattern used 3+ times:

1. Add it to the appropriate CSS file (`components.css` or `layouts.css`)
2. Use semantic naming following the established convention
3. Update this documentation
4. Refactor existing code to use the new class

## Implementation Status

### ✅ Completed

- Created modular CSS files
- Updated `ProjectCard` component
- Updated `Header` component navigation
- Updated `Footer` component
- Partially updated main page (`page.tsx`)
- Partially updated resume page

### 🔄 In Progress

- Complete migration of all pages
- Update projects page
- Test responsive behavior

### 📋 Todo

- Create more specific component variants as needed
- Add CSS custom properties for theme consistency
- Consider CSS-in-JS migration if project scales
- Add CSS linting rules to enforce standards

## Troubleshooting

### Common Issues

1. **Class not applying**: Ensure the CSS file is imported in `globals.css`
2. **Responsive issues**: Check if the responsive utilities in the class definition match your needs
3. **Specificity conflicts**: Tailwind utilities can override custom classes - use `@apply` in CSS or adjust order

### Best Practices

1. Always check if a pattern exists before creating new styles
2. Use semantic names that describe the purpose, not the appearance
3. Keep utility classes for one-off adjustments
4. Document new patterns in this file
5. Test changes across all screen sizes

## Migration Commands

To find and replace common patterns:

```bash
# Find all instances of common card patterns
grep -r "border rounded-lg p-4 shadow" src/

# Find button patterns
grep -r "bg-blue-600 text-white.*rounded-lg" src/

# Find grid patterns
grep -r "grid gap-6 md:grid-cols-2" src/
```

## Future Considerations

1. **CSS Custom Properties**: Consider migrating to CSS custom properties for more dynamic theming
2. **Component Library**: These patterns could evolve into a formal component library
3. **CSS Modules**: For larger projects, consider CSS modules for better encapsulation
4. **Design Tokens**: Implement a design token system for more systematic design consistency
