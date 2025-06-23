'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export default function Header() {
  const links = ['Projects', 'Resume', 'Contact'];

  return (
    <header className="px-6 py-4 bg-white shadow fixed top-0 left-0 right-0 z-50">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Aditya Gambhir
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link}>
              <Link
                href={`/${link.toLowerCase()}`}
                className="hover:text-gray-600"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Nav Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="md:hidden p-2">
              <Menu size={28} aria-label="Open navigation" />
            </button>
          </Dialog.Trigger>

          <Dialog.Content className="fixed top-0 left-0 bottom-0 w-3/4 bg-white shadow-lg">
            <div className="p-4 flex justify-between items-center">
              <span className="font-semibold">Menu</span>
              <Dialog.Close asChild>
                <button aria-label="Close navigation">
                  <X size={28} />
                </button>
              </Dialog.Close>
            </div>
            <nav className="px-4 py-2 space-y-4">
              {links.map((link) => (
                <Dialog.Close asChild key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="block py-2">
                    {link}
                  </Link>
                </Dialog.Close>
              ))}
            </nav>
          </Dialog.Content>
        </Dialog.Root>
      </nav>
    </header>
  );
}
