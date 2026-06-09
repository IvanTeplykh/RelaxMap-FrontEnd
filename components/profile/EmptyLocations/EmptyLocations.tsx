import { AppLink } from '@/components/ui';
import styles from './EmptyLocations.module.css';

interface EmptyLocationsProps {
  text: string;
  buttonLabel: string;
  buttonHref: string;
}

export function EmptyLocations({
  text,
  buttonLabel,
  buttonHref,
}: EmptyLocationsProps) {
  return (
    <div className={styles.Empty}>
      <p className={styles.Text}>{text}</p>
      <AppLink variant="primary" href={buttonHref} className={styles.Button}>
        {buttonLabel}
      </AppLink>
    </div>
  );
}
