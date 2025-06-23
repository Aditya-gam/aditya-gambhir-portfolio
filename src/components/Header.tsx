'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/MobileNav';
import { cn } from '@/lib/utils';

interface HeaderProps {
  readonly onContactClick?: () => void;
}

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
];

export default function Header({ onContactClick }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 max-w-screen-xl items-center justify-between">
        {/* Logo/Brand - Left Aligned */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-2 py-1 -mx-2 -my-1"
          aria-label="Go to homepage"
        >
          Aditya Gambhir
        </Link>

        {/* Desktop Navigation - Right Aligned - Changed from md:flex to lg:flex */}
        <nav className="hidden lg:flex items-center gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-foreground/80 px-3 py-2 rounded-md font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                pathname === href ? 'text-foreground' : 'text-foreground/60',
              )}
              aria-label={`Go to ${label} page`}
            >
              {label}
            </Link>
          ))}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="transition-colors hover:text-foreground/80 px-3 py-2 rounded-md font-medium text-sm text-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Open contact form"
            >
              Contact
            </button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav
          links={[
            { href: '/', label: 'Home' },
            ...navLinks,
            ...(onContactClick
              ? [{ href: '#', label: 'Contact', onClick: onContactClick }]
              : []),
          ]}
        />
      </div>
    </header>
  );
}
