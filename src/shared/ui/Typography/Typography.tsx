import { ElementType, HTMLAttributes } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle' | 'body' | 'caption';
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  as?: ElementType;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl md:text-5xl tracking-tight',
  h2: 'text-3xl md:text-4xl tracking-tight',
  h3: 'text-2xl md:text-3xl tracking-tight',
  h4: 'text-xl md:text-2xl tracking-tight',
  subtitle: 'text-lg',
  body: 'text-base',
  caption: 'text-sm',
};

const colorStyles: Record<TypographyColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  accent: 'text-accent',
  error: 'text-error',
  success: 'text-success',
};

const weightStyles: Record<TypographyWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle: 'p',
  body: 'p',
  caption: 'span',
};

export function Typography({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  as,
  className = '',
  children,
  ...props
}: TypographyProps) {
  const Component = as || defaultElement[variant];
  return (
    <Component
      className={`${variantStyles[variant]} ${colorStyles[color]} ${weightStyles[weight]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
