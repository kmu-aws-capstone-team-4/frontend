import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-3 py-2 bg-card-bg border rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-accent transition-colors disabled:opacity-50 disabled:bg-muted-bg appearance-none ${
              error ? 'border-error focus:ring-error focus:border-error' : 'border-border'
            }`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <ChevronDown size={16} />
          </div>
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
Select.displayName = 'Select';
