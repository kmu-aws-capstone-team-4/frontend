import type { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

export interface IconProps extends LucideProps {
  icon: React.ElementType;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className = '', size = 24, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        size={size}
        className={`shrink-0 ${className}`}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';
