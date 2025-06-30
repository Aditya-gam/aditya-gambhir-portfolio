'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { THEME_CONTENT } from '@/data/content';

interface ThemeToggleProps {
  readonly className?: string;
  readonly variant?: 'default' | 'ghost' | 'outline';
  readonly size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ThemeToggle({
  className,
  variant = 'ghost',
  size = 'icon',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = [
      'system',
      'light',
      'dark',
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'system':
        return <Monitor className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getAriaLabel = () => {
    switch (theme) {
      case 'light':
        return THEME_CONTENT.switchToDark;
      case 'dark':
        return THEME_CONTENT.switchToSystem;
      case 'system':
        return THEME_CONTENT.switchToLight;
      default:
        return THEME_CONTENT.toggleTheme;
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        'transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      aria-label={getAriaLabel()}
      title={`${getAriaLabel()} (Current: ${theme}, Resolved: ${resolvedTheme})`}
    >
      {getIcon()}
      <span className="sr-only">{getAriaLabel()}</span>
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <span className="sr-only">
          {THEME_CONTENT.currentTheme(theme, resolvedTheme)}
        </span>
      )}
    </Button>
  );
}
