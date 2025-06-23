import React from 'react';

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly type?: 'text' | 'email' | 'textarea';
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onBlur: () => void;
  readonly error?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly rows?: number;
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  rows = 5,
}: FormFieldProps) {
  const baseInputClass = `form-input ${error ? 'form-input-error' : ''}`;
  const textareaClass = `form-textarea ${error ? 'form-input-error' : ''}`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label} {required && '*'}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={textareaClass}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={baseInputClass}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}
