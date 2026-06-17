import Image from 'next/image';
import { AppButton } from '@/components/ui';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
}

export function ProfileHeader({
  name,
  avatarUrl,
  articlesAmount,
  isOwnProfile = false,
  onEditClick,
}: ProfileHeaderProps) {
  return (
    <div className={styles.Header}>
      {avatarUrl ? (
        // `unoptimized` skips the optimizer's SSRF check so the default avatar
        // served from a private host (localhost backend) still loads locally.
        <Image
          src={avatarUrl}
          alt={name}
          width={145}
          height={145}
          priority
          unoptimized
          className={styles.Avatar}
        />
      ) : (
        <span className={styles.AvatarFallback} aria-hidden="true">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <div className={styles.Info}>
        <p className={styles.Name}>{name}</p>
        <p className={styles.Articles}>Статей: {articlesAmount}</p>
      </div>
      {isOwnProfile && (
        <AppButton
          variant="secondary"
          onClick={onEditClick}
          className={styles.EditButton}
        >
          Редагувати профіль
        </AppButton>
      )}
    </div>
  );
}
