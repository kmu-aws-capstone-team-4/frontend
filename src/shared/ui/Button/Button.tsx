import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark border border-transparent shadow-sm',
  secondary: 'bg-bg text-text-primary hover:bg-muted-bg border border-border shadow-sm',
  outline: 'bg-transparent text-accent hover:bg-muted-bg border border-accent',
  text: 'bg-transparent text-text-secondary hover:bg-muted-bg hover:text-text-primary border border-transparent',
  danger: 'bg-error text-white hover:bg-red-700 border border-transparent shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-accent disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
