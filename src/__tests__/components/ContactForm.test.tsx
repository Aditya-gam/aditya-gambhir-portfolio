import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContactForm } from '@/components/ContactForm';

expect.extend(toHaveNoViolations);

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: 'test-site-key',
  };
  // Set default mock return value
  mockUseContactForm.mockReturnValue(defaultMockReturn);
});

afterEach(() => {
  process.env = originalEnv;
  jest.clearAllMocks();
});

// Mock the contact form hook
const mockUseContactForm = jest.fn();

jest.mock('@/hooks/useContactForm', () => ({
  useContactForm: () => mockUseContactForm(),
}));

// Default mock implementation
const defaultMockReturn = {
  formData: { name: '', email: '', message: '' },
  errors: { name: '', email: '', message: '' },
  captchaToken: null,
  submitting: false,
  recaptchaRef: { current: null },
  handleInputChange: jest.fn(),
  handleInputBlur: jest.fn(),
  handleSubmit: jest.fn(),
  handleCaptchaChange: jest.fn(),
  handleCaptchaExpired: jest.fn(),
  handleCaptchaError: jest.fn(),
};

// Mock ReCAPTCHA component
jest.mock('react-google-recaptcha', () => {
  return function MockReCAPTCHA({
    sitekey,
    onChange,
    'aria-label': ariaLabel,
    ...props
  }: {
    sitekey: string;
    onChange: (token: string | null) => void;
    'aria-label'?: string;
    [key: string]: unknown;
  }) {
    return (
      <button
        type="button"
        data-testid="recaptcha"
        aria-label={ariaLabel}
        onClick={() => onChange('mock-token')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange('mock-token');
          }
        }}
        {...props}
      >
        Mock reCAPTCHA
      </button>
    );
  };
});

describe('ContactForm', () => {
  describe('Accessibility Compliance', () => {
    it('passes axe accessibility audit', async () => {
      const { container } = render(<ContactForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper form structure and labels', () => {
      render(<ContactForm />);

      // Check all required form elements are present
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

      // Check for required field indicators
      expect(screen.getAllByLabelText(/required field/i)).toHaveLength(3);
    });

    it('has proper ARIA attributes on form fields', () => {
      render(<ContactForm />);

      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      const messageField = screen.getByLabelText(/message/i);

      // Check ARIA attributes
      expect(nameField).toHaveAttribute('aria-required', 'true');
      expect(emailField).toHaveAttribute('aria-required', 'true');
      expect(messageField).toHaveAttribute('aria-required', 'true');

      expect(nameField).toHaveAttribute('aria-invalid', 'false');
      expect(emailField).toHaveAttribute('aria-invalid', 'false');
      expect(messageField).toHaveAttribute('aria-invalid', 'false');
    });

    it('has proper reCAPTCHA accessibility', () => {
      render(<ContactForm />);

      const captchaGroup = screen.getByRole('group');
      expect(captchaGroup).toHaveAttribute('aria-labelledby', 'captcha-label');

      const recaptcha = screen.getByTestId('recaptcha');
      expect(recaptcha).toHaveAttribute(
        'aria-label',
        'Complete the reCAPTCHA to verify you are human',
      );
    });

    it('has accessible submit button', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).toHaveAttribute('aria-live', 'polite');
      expect(submitButton).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Form Functionality', () => {
    it('renders all form fields correctly', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /send message/i }),
      ).toBeInTheDocument();
    });

    it('has proper input types and attributes', () => {
      render(<ContactForm />);

      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      const messageField = screen.getByLabelText(/message/i);

      expect(nameField).toHaveAttribute('type', 'text');
      expect(nameField).toHaveAttribute('autocomplete', 'name');

      expect(emailField).toHaveAttribute('type', 'email');
      expect(emailField).toHaveAttribute('autocomplete', 'email');

      expect(messageField.tagName.toLowerCase()).toBe('textarea');
      expect(messageField).toHaveAttribute('autocomplete', 'off');
    });

    it('has proper placeholder text', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toHaveAttribute(
        'placeholder',
        'Your full name',
      );
      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        'placeholder',
        'your.email@example.com',
      );
      expect(screen.getByLabelText(/message/i)).toHaveAttribute(
        'placeholder',
        'Tell me about your project, question, or how I can help you...',
      );
    });
  });

  describe('Phase 6 Requirements', () => {
    it('does not show demo mode banner', () => {
      render(<ContactForm />);

      // Ensure no debug info is shown
      expect(screen.queryByText(/debug/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/site key/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/configured/i)).not.toBeInTheDocument();
    });

    it('has brand focus rings on form elements', () => {
      render(<ContactForm />);

      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      const messageField = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });

      // Check that form input and textarea classes include focus ring styles
      expect(nameField).toHaveClass('form-input');
      expect(emailField).toHaveClass('form-input');
      expect(messageField).toHaveClass('form-textarea');

      // The focus ring styles are defined in CSS for .form-input and .form-textarea classes
      // We verify the base classes are applied, which include focus-visible:ring-2 etc.
      expect(submitButton.className).toContain('focus-visible:ring-2');
      expect(submitButton.className).toContain('focus-visible:ring-ring');
      expect(submitButton.className).toContain('focus-visible:ring-offset-2');
    });

    it('has proper form validation ARIA with errors', () => {
      // Reset mock to provide error state
      mockUseContactForm.mockReturnValue({
        ...defaultMockReturn,
        formData: { name: '', email: 'invalid-email', message: '' },
        errors: {
          name: '',
          email: 'Please enter a valid email address.',
          message: '',
        },
      });

      render(<ContactForm />);

      const emailField = screen.getByLabelText(/email/i);

      // Check error ARIA attributes
      expect(emailField).toHaveAttribute('aria-invalid', 'true');
      expect(emailField).toHaveAttribute(
        'aria-describedby',
        'contact-email-error',
      );

      // Check error message is properly associated
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveAttribute('id', 'contact-email-error');
      expect(errorMessage).toHaveAttribute('aria-live', 'polite');
      expect(errorMessage).toHaveTextContent(
        'Please enter a valid email address.',
      );
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports proper tab order', async () => {
      const user = userEvent.setup();

      // Set up form with captcha token to enable submit button
      mockUseContactForm.mockReturnValue({
        ...defaultMockReturn,
        captchaToken: 'mock-token',
      });

      render(<ContactForm />);

      // Tab through form elements
      await user.tab();
      expect(screen.getByLabelText(/name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/email/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/message/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByTestId('recaptcha')).toHaveFocus();

      await user.tab();
      expect(
        screen.getByRole('button', { name: /send message/i }),
      ).toHaveFocus();
    });
  });

  describe('Screen Reader Support', () => {
    it('provides proper form instructions', () => {
      render(<ContactForm />);

      // Check for screen reader only instructions
      expect(
        screen.getByText('Security verification required to submit form'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Complete the verification above to send your message',
        ),
      ).toBeInTheDocument();
    });

    it('provides proper button state announcements', () => {
      // Reset mock to provide submitting state
      mockUseContactForm.mockReturnValue({
        ...defaultMockReturn,
        formData: { name: 'Test', email: 'test@test.com', message: 'Hello' },
        captchaToken: 'token',
        submitting: true,
      });

      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /sending/i });

      // Check loading state announcements
      expect(submitButton).toHaveAttribute('aria-live', 'polite');
      expect(submitButton).toHaveAttribute('aria-atomic', 'true');

      const loadingSpinner = screen.getByLabelText('Submitting form');
      expect(loadingSpinner).toBeInTheDocument();
    });
  });
});
