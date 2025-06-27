'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MobileNav } from '@/components/MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSectionHighlight } from '@/hooks/useSectionHighlight';
import { HOMEPAGE_SECTIONS } from '@/constants';
import { cn } from '@/lib/utils';

interface HeaderProps {
  readonly onContactClick?: () => void;
}

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Me' },
];

export default function Header({ onContactClick }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Use section highlight hook for homepage
  const { activeSection, scrollToSection } = useSectionHighlight({
    sectionIds: HOMEPAGE_SECTIONS,
    threshold: 0.6,
    rootMargin: '-20% 0px -20% 0px',
  });

  // Transform scroll position to dynamic values
  const headerHeight = useTransform(scrollY, [0, 100], [64, 52]);
  const blurAmount = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(8px)'],
  );
  const backgroundOpacity = useTransform(
    scrollY,
    [0, 100],
    ['hsl(var(--background) / 1)', 'hsl(var(--background) / 0.8)'],
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 16); // 1rem = 16px
    });

    return () => unsubscribe();
  }, [scrollY]);

  const handleNavClick = (href: string) => {
    if (href === '/' && pathname === '/') {
      // On homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="sticky top-0 w-full border-b z-40"
      style={{
        height: headerHeight,
        backdropFilter: blurAmount,
        backgroundColor: backgroundOpacity,
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-full max-w-screen-xl items-center justify-between"
        animate={{
          paddingTop: isScrolled ? '0.5rem' : '0.75rem',
          paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Home Button - Left Aligned */}
        <Link
          href="/"
          className={cn(
            'flex items-center space-x-2 font-bold transition-all duration-300 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-3 py-2 -mx-1 -my-1',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60',
            isScrolled && 'text-sm',
          )}
          aria-label="Go to homepage"
          onClick={() => handleNavClick('/')}
        >
          Home
        </Link>

        {/* Desktop Navigation - Center Aligned */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-all duration-300 hover:text-foreground/80 px-3 py-2 rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                pathname === href ? 'text-foreground' : 'text-foreground/60',
                isScrolled && 'text-sm',
              )}
              aria-label={`Go to ${label} page`}
              onClick={() => handleNavClick(href)}
            >
              {label}
            </Link>
          ))}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className={cn(
                'transition-all duration-300 hover:text-foreground/80 px-3 py-2 rounded-md font-medium text-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isScrolled && 'text-sm',
              )}
              aria-label="Open contact form"
            >
              Contact
            </button>
          )}
        </nav>

        {/* Right side - Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden lg:flex" variant="ghost" size="icon" />

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
      </motion.div>
    </motion.header>
  );
}
