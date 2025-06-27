import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;

      toHaveAttribute(_attr: string, _value?: string): R;

      toHaveClass(_className: string): R;

      toHaveTextContent(_text: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;

      toHaveValue(_value: string | number | string[]): R;

      toHaveDisplayValue(_value: string | RegExp | (string | RegExp)[]): R;
      toBeChecked(): R;
      toHaveFocus(): R;

      toHaveFormValues(_expectedValues: Record<string, unknown>): R;

      toHaveStyle(_css: string | Record<string, string | number>): R;

      toHaveAccessibleName(_name: string | RegExp): R;

      toHaveAccessibleDescription(_description: string | RegExp): R;
    }
  }
}
