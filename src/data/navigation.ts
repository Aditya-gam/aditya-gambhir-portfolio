export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

// External navigation items for standalone pages (none currently)
// Keeping this list empty removes the duplicate "Projects" button that navigates to /projects
export const EXTERNAL_NAVIGATION = [] as const;
