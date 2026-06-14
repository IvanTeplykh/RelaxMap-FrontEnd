"use client";

import { StarRating } from "react-flexible-star-rating";

interface StarsProps {
  rate?: number;
}

const STARS_DIMENSION = 7.5;

export function Stars({ rate = 0 }: StarsProps) {
  const safeRate = Math.min(5, Math.max(0, Math.round(rate * 2) / 2));

  return (
    <StarRating
      initialRating={safeRate}
      starsLength={5}
      isHalfRatingEnabled
      isReadOnly
      dimension={STARS_DIMENSION}
      color="#000000"
    />
  );
}
