'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/**
 * Thin wrapper around next-themes. Its own client module so the root layout can
 * stay a server component. next-themes injects a blocking inline script that
 * sets the `.dark`/`.light` class before first paint — no theme flash.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
