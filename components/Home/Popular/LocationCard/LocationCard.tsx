import Image from "next/image";
import css from "./LocationCard.module.css";
import { Location } from "@/types/profile";
import { Stars } from "@/components/locations/LocationCard/Stars";
import { AppLink } from "@/components/ui/Button/Button";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  const rate = location.rate ?? location.rating ?? 0;
  return (
    <div className={css.cardWrapper} key={location._id}>
      <div className={css.cardImageWrapper}>
        <Image
          width={280}
          height={280}
          src={location.image ?? ""}
          alt={location.name ?? "Location Image"}
          className={css.cardImage}
          // sizes="(min-width: 1440px) 421px, (min-width: 768px) 340px, (min-width: 375px) 335px, calc(100vw - 48px)"
        />
      </div>
      <div className={css.cardContent}>
        <p className={css.locationType}>{location.locationType}</p>
        <div className={css.starsWrapper}>
          <Stars rate={rate} />
        </div>
        <h3 className={css.cardTitle}>{location.name}</h3>
        <AppLink
          href={`/locations/${location._id}`}
          className={css.cardLink}
          variant="secondary"
        >
          Переглянути локацію
        </AppLink>
      </div>
    </div>
  );
}
