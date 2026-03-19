import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted-bg text-text-primary',
  success: 'bg-green-100 text-success',
  warning: 'bg-orange-100 text-warning',
  error: 'bg-error text-white',
  outline: 'bg-transparent text-text-secondary border border-border',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
