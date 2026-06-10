import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { classNames } from '@/lib/utils';
import styles from './layout.module.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={classNames(montserrat.className, styles.Page)}>
      <main className={styles.Main}>{children}</main>
      <footer className={styles.Footer}>© 2026 Relax Map</footer>
    </div>
  );
}
