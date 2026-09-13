import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed font-sans';

    const variants = {
      primary:
        'bg-maroon hover:bg-maroon-dark text-cream-light focus:ring-maroon shadow-warm-sm hover:scale-[1.01]',
      secondary:
        'bg-cream-dark/80 hover:bg-cream-dark text-brown focus:ring-cream-dark border border-cream-border',
      gold: 'bg-gold hover:bg-gold-light text-maroon-dark focus:ring-gold shadow-warm-sm',
      outline:
        'bg-transparent border border-maroon text-maroon hover:bg-maroon hover:text-cream-light focus:ring-maroon',
      ghost: 'bg-transparent text-brown hover:bg-cream hover:text-maroon',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-xs px-5 py-2.5 rounded-xl gap-2',
      lg: 'text-sm px-7 py-3.5 rounded-2xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
