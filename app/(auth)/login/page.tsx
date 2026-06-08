import type { Metadata } from 'next';
import { AuthNav } from '@/components/auth/AuthNav/AuthNav';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Вхід | RelaxMap',
};

export default function LoginPage() {
  return (
    <div className={styles.Container}>
      <AuthNav />
      <h1 className={styles.Title}>Вхід</h1>
      <LoginForm />
    </div>
  );
}
