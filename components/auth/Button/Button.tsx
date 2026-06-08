import type { ButtonHTMLAttributes } from 'react';
import { classNames } from '@/lib/utils';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, type = 'submit', className, ...rest }: ButtonProps) {
  return (
    <button type={type} className={classNames(styles.Button, className)} {...rest}>
      {children}
    </button>
  );
}
