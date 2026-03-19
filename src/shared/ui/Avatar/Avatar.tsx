import { forwardRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackName?: string;
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ size = 'md', fallbackName = 'User', src, alt, className = '', ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    
    // Create initials up to 2 characters
    const initials = fallbackName
      .trim()
      .split(/\s+/)
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden bg-muted-bg rounded-full border border-border shrink-0 ${sizeStyles[size]} ${className}`}>
        {src && !hasError ? (
          <img
            ref={ref}
            src={src}
            alt={alt || fallbackName}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
            {...props}
          />
        ) : (
          <span className="font-medium text-text-secondary select-none">
            {initials}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
