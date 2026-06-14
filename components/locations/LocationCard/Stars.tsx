"use client";

import { StarRating } from "react-flexible-star-rating";

interface StarsProps {
  rate?: number;
}

// The library treats `dimension` as the rem width of the WHOLE 5-star row
// (style.maxWidth = `${dimension}rem`), not the per-star pixel size.
// ~7.5rem ≈ 120px → ~24px per star.
const STARS_DIMENSION = 7.5;

export function Stars({ rate = 0 }: StarsProps) {
  // The library throws if initialRating isn't a multiple of 0.5 while
  // half-rating is enabled, so snap the average score to the nearest half.
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
