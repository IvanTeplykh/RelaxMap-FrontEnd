import type { ReactNode } from 'react';
import Link from 'next/link';
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
      <header className={styles.Header}>
        <Link href="/" className={styles.Logo} aria-label="Relax Map — на головну">
          <svg className={styles.LogoIcon} aria-hidden="true">
            <use href="/sprite.svg#map_search" />
          </svg>
          <span className={styles.LogoText}>Relax Map</span>
        </Link>
      </header>

      <main className={styles.Main}>{children}</main>

      <footer className={styles.Footer}>© 2025 Relax Map</footer>
    </div>
  );
}
