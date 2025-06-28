'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MobileNav } from '@/components/MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSectionHighlight } from '@/hooks/useSectionHighlight';
import {
  HOMEPAGE_SECTIONS,
  NAVIGATION_ITEMS,
  EXTERNAL_NAVIGATION,
} from '@/constants';
import { cn } from '@/lib/utils';

interface HeaderProps {
  readonly onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const isHomepage = pathname === '/';

  // Use section highlight hook for homepage
  const { activeSection: currentActiveSection } = useSectionHighlight({
    sectionIds: HOMEPAGE_SECTIONS,
    threshold: 0.3,
    rootMargin: '-10% 0px -10% 0px',
  });

  useEffect(() => {
    if (isHomepage && currentActiveSection) {
      setActiveSection(currentActiveSection);
    } else if (!isHomepage) {
      // Reset to hero when not on homepage
      setActiveSection('hero');
    }
  }, [currentActiveSection, isHomepage]);

  // Transform scroll position to dynamic values for enhanced sticky behavior
  const blurAmount = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(8px)']);
  const backgroundOpacity = useTransform(
    scrollY,
    [0, 50],
    ['hsl(var(--background) / 0.95)', 'hsl(var(--background) / 0.85)'],
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 10); // Earlier trigger for better UX
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Smooth scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for header height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (href: string, event?: React.MouseEvent) => {
    if (href.startsWith('#')) {
      // Smooth scroll to section
      event?.preventDefault();
      const sectionId = href.substring(1);
      if (sectionId === 'hero') {
        // For hero section, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(sectionId);
      }
    }
    // For external links (/projects), let default navigation work
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 w-full border-b z-50 bg-background/90 backdrop-blur-sm shadow-sm"
      style={{
        backdropFilter: blurAmount,
        backgroundColor: backgroundOpacity,
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8 flex max-w-screen-xl items-center justify-between transition-all duration-200',
          isScrolled ? 'h-14 py-2' : 'h-16 py-3',
        )}
      >
        {/* Brand/Logo - Left Aligned */}
        <Link
          href="/"
          className={cn(
            'flex items-center space-x-2 font-bold transition-all duration-200 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-3 py-2 -mx-1 -my-1',
            isScrolled && 'text-sm',
          )}
          aria-label="Go to homepage"
        >
          Aditya Gambhir
        </Link>

        {/* Desktop Navigation - Center Aligned */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Homepage section navigation */}
          {isHomepage &&
            NAVIGATION_ITEMS.map(({ href, label }) => {
              const sectionId = href.substring(1); // Remove #
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={href}
                  onClick={(e) => handleNavClick(href, e)}
                  className={cn(
                    'transition-all duration-200 hover:text-foreground/80 hover:bg-accent/50 px-3 py-2 rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70',
                    isScrolled && 'text-sm py-1',
                  )}
                  aria-label={`Go to ${label} section`}
                >
                  {label}
                </button>
              );
            })}

          {/* External navigation (other pages) */}
          {EXTERNAL_NAVIGATION.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-all duration-200 hover:text-foreground/80 hover:bg-accent/50 px-3 py-2 rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                pathname === href
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/70',
                isScrolled && 'text-sm py-1',
              )}
              aria-label={`Go to ${label} page`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side - Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden lg:flex" variant="ghost" size="icon" />

          {/* Mobile Navigation */}
          <MobileNav
            links={[
              ...(isHomepage
                ? NAVIGATION_ITEMS.map(({ href, label }) => ({
                    href,
                    label,
                    onClick: () => handleNavClick(href),
                  }))
                : [{ href: '/', label: 'Home' }]),
              ...EXTERNAL_NAVIGATION,
            ]}
          />
        </div>
      </div>
    </motion.header>
  );
}
