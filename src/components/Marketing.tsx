import { cn } from '@cladd-ui/react';
import type { ReactNode } from 'react';

interface MarketingHeadingProps {
  children: ReactNode;
  className?: string;
}

export function MarketingKicker({
  children,
  className,
}: MarketingHeadingProps) {
  return (
    <span
      className={cn(
        'text-xs tracking-wide text-cladd-fg-soft uppercase',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MarketingTitle({ children, className }: MarketingHeadingProps) {
  return (
    <h2
      className={cn(
        'text-3xl font-semibold tracking-tight text-white light:text-black',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function MarketingText({ children, className }: MarketingHeadingProps) {
  return (
    <p className={cn('max-w-md text-base text-cladd-fg-soft', className)}>
      {children}
    </p>
  );
}
