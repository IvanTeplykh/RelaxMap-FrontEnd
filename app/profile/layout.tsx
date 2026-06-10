import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { classNames } from '@/lib/utils';
import { Providers } from './Providers';
import styles from './layout.module.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Профіль | RelaxMap',
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className={classNames(montserrat.className, styles.Page)}>
      <Providers>
        <div className={styles.Container}>{children}</div>
      </Providers>
    </div>
  );
}
