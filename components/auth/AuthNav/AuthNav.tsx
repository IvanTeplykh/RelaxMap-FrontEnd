'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { classNames } from '@/lib/utils';
import styles from './AuthNav.module.css';

const tabs = [
  { href: '/register', label: 'Реєстрація' },
  { href: '/login', label: 'Вхід' },
] as const;

export function AuthNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.Nav}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={classNames(styles.Tab, isActive && styles.TabActive)}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
