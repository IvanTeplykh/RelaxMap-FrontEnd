"use client";

import Link from "next/link";
import type { LocationDetails } from "@/types/location";
import { Stars } from "@/components/locations/LocationCard/Stars";
import css from "./LocationInfoBlock.module.css";

interface Props {
  location: LocationDetails;
}

export const LocationInfoBlock = ({ location }: Props) => {
  return (
    <div className={css.wrapper}>
      <div className={css.rating}>
        <Stars rate={location.rate} />
        <span className={css.rateValue}>{location.rate.toFixed(1)}</span>
      </div>

      <h1 className={css.title}>{location.name}</h1>

      <p className={css.row}>
        <span className={css.label}>Регіон:</span>
        <span className={css.value}>
          {location.regionInfo?.region || location.region}
        </span>
      </p>

      <p className={css.row}>
        <span className={css.label}>Тип локації:</span>
        <span className={css.value}>
          {location.locationTypeInfo?.type || location.locationType}
        </span>
      </p>

      <p className={css.row}>
        <span className={css.label}>Автор статті:</span>
        <Link
          href={`/profile/${location.ownerId._id}`}
          className={`${css.link} ${css.value}`}
        >
          {location.ownerId.name}
        </Link>
      </p>
    </div>
  );
};
