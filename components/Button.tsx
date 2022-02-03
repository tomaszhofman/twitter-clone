import React, { DOMAttributes } from 'react';

export type BaseProps<T> = {
  size?: 'sm' | 'lg' | 'md' | 'icon';
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>['onClick'];
  children?: T extends React.ReactText ? React.ReactText : React.ReactNode;
  className?: string;
  ariaLabel: string;
};

export type ButtonProps<T> = BaseProps<T> & Omit<JSX.IntrinsicElements['button'], 'ref'>;

function Button<T>(props: ButtonProps<T>) {
  const { disabled, size, children, className, onClick, ariaLabel } = props;

  return (
    <button
      disabled={disabled}
      className={` inline-flex items-center ${size === 'icon' && ''} ${className}`}
      tabIndex={0}
      onClick={onClick}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export { Button };
