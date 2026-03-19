import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-3 py-2 bg-card-bg border rounded-md text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-accent transition-colors disabled:opacity-50 disabled:bg-muted-bg ${
              error ? 'border-error focus:ring-error focus:border-error' : 'border-border'
            }`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none text-sm font-medium"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}
        </div>
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
