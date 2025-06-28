import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      // Testing Library DOM matchers
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveTextContent(text: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | number | string[]): R;
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
      toBeChecked(): R;
      toHaveFocus(): R;
      toHaveFormValues(expectedValues: Record<string, unknown>): R;
      toHaveStyle(css: string | Record<string, string | number>): R;
      toHaveAccessibleName(name: string | RegExp): R;
      toHaveAccessibleDescription(description: string | RegExp): R;

      // Jest core matchers
      toBe(value: unknown): R;
      toEqual(value: unknown): R;
      toBeGreaterThan(value: number): R;
      toHaveLength(length: number): R;

      // Jest mock matchers
      toHaveBeenCalled(): R;
      toHaveBeenCalledTimes(times: number): R;
      toHaveBeenCalledWith(...args: unknown[]): R;
    }
  }
}
