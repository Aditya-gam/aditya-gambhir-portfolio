'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  return (
    <Dialog.Root>
      {/* WCAG-compliant hamburger button with 48×48px touch target */}
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-12 w-12 p-3"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </Dialog.Trigger>

      {/* Backdrop overlay */}
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      {/* Slide-in drawer */}
      <Dialog.Content className="fixed inset-y-0 left-0 z-50 h-full w-3/4 max-w-sm bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-[state=open]:duration-300 data-[state=closed]:duration-200">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <Dialog.Title className="text-lg font-semibold">Menu</Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {links.map(({ href, label, onClick }) => (
                <Dialog.Close asChild key={href + label}>
                  {onClick ? (
                    <button
                      onClick={onClick}
                      className={cn(
                        'flex h-12 w-full items-center rounded-lg px-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none text-left',
                        'text-muted-foreground',
                      )}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href}
                      className={cn(
                        'flex h-12 items-center rounded-lg px-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
                        pathname === href
                          ? 'bg-accent text-accent-foreground'
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
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
