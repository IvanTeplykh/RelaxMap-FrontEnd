import type { Metadata } from 'next';
import { AuthNav } from '@/components/auth/AuthNav/AuthNav';
import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Реєстрація | RelaxMap',
};

export default function RegisterPage() {
  return (
    <div className={styles.Container}>
      <AuthNav />
      <h1 className={styles.Title}>Реєстрація</h1>
      <RegisterForm />
    </div>
  );
}
