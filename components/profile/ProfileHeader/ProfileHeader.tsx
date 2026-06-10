import Image from 'next/image';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

export function ProfileHeader({
  name,
  avatarUrl,
  articlesAmount,
}: ProfileHeaderProps) {
  return (
    <header className={styles.Header}>
      {avatarUrl ? (
        // `unoptimized` skips the optimizer's SSRF check so the default avatar
        // served from a private host (localhost backend) still loads locally.
        <Image
          src={avatarUrl}
          alt={name}
          width={145}
          height={145}
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
    </header>
  );
}
