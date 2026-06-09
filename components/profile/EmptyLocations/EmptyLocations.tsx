import { AppLink } from '@/components/ui';
import styles from './EmptyLocations.module.css';

export function EmptyLocations() {
  return (
    <div className={styles.Empty}>
      <p className={styles.Text}>
        Ви ще нічого не публікували, поділіться своєю першою локацією!
      </p>
      <AppLink
        variant="primary"
        href="/locations/create"
        className={styles.Button}
      >
        Поділитись локацією
      </AppLink>
    </div>
  );
}
