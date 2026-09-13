import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'maroon' | 'gold' | 'cream' | 'outline' | 'success';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'maroon',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-bold uppercase tracking-wider rounded-full font-sans transition-colors';

  const variants = {
    maroon: 'bg-maroon-soft text-maroon border border-maroon/20',
    gold: 'bg-gold-soft text-maroon-dark border border-gold-border',
    cream: 'bg-cream text-brown-muted border border-cream-border',
    outline: 'bg-transparent border border-maroon/30 text-maroon',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {children}
    </span>
  );
};
