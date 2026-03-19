import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-3 py-2 bg-card-bg border rounded-md text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-accent transition-colors disabled:opacity-50 disabled:bg-muted-bg resize-y min-h-[80px] ${
            error ? 'border-error focus:ring-error focus:border-error' : 'border-border'
          }`}
          {...props}
        />
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
