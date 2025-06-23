'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavLink {
  readonly href: string;
  readonly label: string;
  readonly onClick?: () => void;
}

interface MobileNavProps {
  readonly links: NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const pathname = usePathname();

  // Cleanup function to restore scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        document.body.style.overflow = open ? 'hidden' : 'unset';
      }}
    >
      {/* WCAG-compliant hamburger button with 48×48px touch target */}
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-12 w-12 p-3 hover:bg-accent hover:text-accent-foreground"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Enhanced backdrop overlay with proper z-index and blur */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:duration-200 data-[state=open]:duration-300" />

        {/* Slide-in drawer with higher z-index */}
        <Dialog.Content className="fixed inset-y-0 left-0 z-[101] h-full w-3/4 max-w-sm bg-background border-r shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-[state=open]:duration-300 data-[state=closed]:duration-200 focus:outline-none">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-background/95 backdrop-blur p-6">
              <Dialog.Title className="text-lg font-semibold text-foreground">
                Navigation
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-accent hover:text-accent-foreground"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </Dialog.Close>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-6 bg-background overflow-y-auto">
              <div className="space-y-2">
                {links.map(({ href, label, onClick }) => (
                  <Dialog.Close asChild key={href + label}>
                    {onClick ? (
                      <button
                        onClick={onClick}
                        className={cn(
                          'flex h-12 w-full items-center rounded-lg px-4 text-lg font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none text-left',
                          'text-muted-foreground active:scale-95',
                        )}
                      >
                        {label}
                      </button>
                    ) : (
                      <Link
                        href={href}
                        className={cn(
                          'flex h-12 items-center rounded-lg px-4 text-lg font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none active:scale-95',
                          pathname === href
                            ? 'bg-accent text-accent-foreground shadow-sm'
                            : 'text-muted-foreground',
                        )}
                      >
                        {label}
                      </Link>
                    )}
                  </Dialog.Close>
                ))}
              </div>
            </nav>

            {/* Footer - Optional branding */}
            <div className="border-t p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                © {new Date().getFullYear()} Aditya Gambhir
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
