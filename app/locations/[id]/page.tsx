"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getLocationById } from "@/lib/locationsApi";
import { getFeedbacks } from "@/lib/feedbacksApi";

import type { LocationDetails } from "@/types/location";

import { LocationGallery } from "@/components/LocationDetails/LocationGallery/LocationGallery";
import { LocationInfoBlock } from "@/components/LocationDetails/LocationInfoBlock/LocationInfoBlock";
import { LocationDescription } from "@/components/LocationDetails/LocationDescription/LocationDescription";
import { ReviewsBlock } from "@/components/LocationDetails/ReviewsBlock/ReviewsBlock";

import css from "./page.module.css";

const PER_PAGE = 10;

export default function LocationDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const locationQuery = useQuery<LocationDetails>({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id),
    enabled: !!id,
  });

  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks", id],
    queryFn: () =>
      getFeedbacks({
        locationId: id,
        page: 1,
        perPage: PER_PAGE,
      }),
    enabled: !!id,
  });

  if (locationQuery.isLoading || feedbacksQuery.isLoading) {
    return <p className={css.State}>Завантаження…</p>;
  }

  if (locationQuery.isError || feedbacksQuery.isError || !locationQuery.data) {
    return <p className={css.State}>Не вдалося завантажити локацію.</p>;
  }

  const location = locationQuery.data;
  const feedbacks = feedbacksQuery.data?.feedbacks ?? [];

  return (
    <div className="container">
      <section className={css.LocationSection}>
        <div className={css.InfoWrapper}>
          <LocationGallery image={location.image} name={location.name} />
          <LocationInfoBlock location={location} />
        </div>
      </section>

      <section className={css.DescriptionSection}>
        <LocationDescription description={location.description} />
      </section>

      <section className={css.ReviewsSection}>
        <ReviewsBlock locationId={id} feedbacks={feedbacks} />
      </section>
    </div>
  );
}
