import type { InputHTMLAttributes } from 'react';
import { classNames } from '@/lib/utils';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, name, error, type = 'text', ...rest }: InputProps) {
  return (
    <div className={styles.Field}>
      <label htmlFor={name} className={styles.Label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={classNames(styles.Input, error && styles.InputError)}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error && <span className={styles.ErrorText}>{error}</span>}
    </div>
  );
}
