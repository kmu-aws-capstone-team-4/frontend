import { HTMLAttributes, forwardRef } from 'react';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-card-bg border border-border rounded-xl shadow-sm overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
