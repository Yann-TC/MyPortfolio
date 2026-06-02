import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  target,
  rel,
  ...props
}: ButtonProps) {
  const resolvedTarget = target ?? '_blank';
  const resolvedRel = resolvedTarget === '_blank' ? rel ?? 'noreferrer' : rel;

  return (
    <a
      className={`button button--${variant} ${className}`.trim()}
      target={resolvedTarget}
      rel={resolvedRel}
      {...props}
    >
      {children}
    </a>
  );
}
