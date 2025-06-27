import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Mock localStorage at the top to ensure it is a jest.fn()
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

// Mock the Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    className,
    'aria-label': ariaLabel,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    'aria-label'?: string;
    [key: string]: unknown;
  }) => (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sun: ({ className }: { className?: string }) => (
    <div data-testid="sun-icon" className={className} />
  ),
  Moon: ({ className }: { className?: string }) => (
    <div data-testid="moon-icon" className={className} />
  ),
  Monitor: ({ className }: { className?: string }) => (
    <div data-testid="monitor-icon" className={className} />
  ),
}));

const renderThemeToggle = (props = {}) => {
  return render(
    <ThemeProvider>
      <ThemeToggle {...props} />
    </ThemeProvider>,
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    renderThemeToggle();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('should show monitor icon for system theme', () => {
    renderThemeToggle();

    expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
  });

  it('should cycle through themes when clicked', () => {
    renderThemeToggle();

    const button = screen.getByRole('button');

    // First click - switch to light
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    // Second click - switch to dark
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to system theme');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    // Third click - back to system
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    renderThemeToggle({ className: 'custom-class' });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should handle different variants', () => {
    renderThemeToggle({ variant: 'outline' });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should handle different sizes', () => {
    renderThemeToggle({ size: 'lg' });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be keyboard accessible', () => {
    renderThemeToggle();
    const button = screen.getByRole('button');
    // Simulate keyboard accessibility by focusing and pressing Space/Enter
    button.focus();
    fireEvent.click(button); // Simulate user pressing Enter/Space
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('should have proper focus styles', () => {
    renderThemeToggle();

    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus-visible:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
  });

  it('should persist theme in localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    renderThemeToggle();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setItemSpy).toHaveBeenCalledWith('aditya-portfolio-theme', 'light');
    setItemSpy.mockRestore();
  });
});
