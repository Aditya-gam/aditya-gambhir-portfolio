'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/MobileNav';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        {/* Logo/Brand */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Aditya Gambhir
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-6 text-sm lg:gap-8">
          <div className="hidden md:flex">
            {navLinks.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition-colors hover:text-foreground/80 px-3 py-2',
                  pathname === href ? 'text-foreground' : 'text-foreground/60',
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Logo (centered) */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link
              href="/"
              className="flex items-center justify-center font-bold md:hidden"
            >
              Aditya Gambhir
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}
