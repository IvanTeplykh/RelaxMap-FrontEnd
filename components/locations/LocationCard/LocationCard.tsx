import Image from "next/image";
import Link from "next/link";
import { AppLink } from "@/components/ui";
import type { Location } from "@/types/profile";
import { Stars } from "./Stars";
import styles from "./LocationCard.module.css";

interface LocationCardProps {
  location: Location;
  editable?: boolean;
  locationTypeLabel?: string;
}

export function LocationCard({
  location,
  editable = false,
  locationTypeLabel,
}: LocationCardProps) {
  const rate = location.rate ?? location.rating ?? 0;

  return (
    <article className={styles.Card}>
      <div className={styles.ImageWrap}>
        <Image
          src={location.image}
          alt={location.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={styles.Image}
        />
      </div>

      <div className={styles.Content}>
        <span className={styles.Tag}>
          {locationTypeLabel || location.locationType}
        </span>
        <Stars rate={rate} />
        <h3 className={styles.Name}>{location.name}</h3>

        <div className={styles.Actions}>
          <AppLink
            variant="secondary"
            href={`/locations/${location._id}`}
            className={styles.ViewLink}
          >
            Переглянути локацію
          </AppLink>

          {editable && (
            <Link
              href={`/locations/${location._id}/edit`}
              className={styles.EditButton}
              aria-label="Редагувати локацію"
            >
              {/* TODO: замінити на <use href="/sprite.svg#edit" /> коли додадуть у спрайт */}
              <svg
                className={styles.EditIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
