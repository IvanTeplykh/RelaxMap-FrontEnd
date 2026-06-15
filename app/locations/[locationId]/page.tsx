"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getLocationDetailsById } from "@/lib/locationsApi";
import { getFeedbacksByLocationId } from "@/lib/feedbacksApi";

import type { LocationDetails } from "@/types/location";
import { Loader } from "@/components/ui/Loader/Loader";

import { LocationGallery } from "@/components/LocationDetails/LocationGallery/LocationGallery";
import { LocationInfoBlock } from "@/components/LocationDetails/LocationInfoBlock/LocationInfoBlock";
import { LocationDescription } from "@/components/LocationDetails/LocationDescription/LocationDescription";
import { ReviewsBlock } from "@/components/LocationDetails/ReviewsBlock/ReviewsBlock";
import { AppButton } from "@/components/ui/Button/Button";

import css from "./page.module.css";

const PER_PAGE = 10;

export default function LocationDetailsPage() {
  const { locationId } = useParams<{ locationId: string }>();

  const locationQuery = useQuery<LocationDetails>({
    queryKey: ["location", locationId],
    queryFn: () => getLocationDetailsById(locationId),
    enabled: !!locationId,
  });

  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks", locationId],
    queryFn: () =>
      getFeedbacksByLocationId({
        locationId: locationId,
        page: 1,
        perPage: PER_PAGE,
      }),
    enabled: !!locationId,
  });

  if (locationQuery.isLoading || feedbacksQuery.isLoading) {
    return <Loader fullScreen size="lg" variant="primary" />;
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
        <div className={css.ReviewsHeader}>
          <h2 className={css.ReviewsTitle}>Відгуки</h2>
          <AppButton variant="primary" className={css.SubmitReviewBtn}>
            Залишити відгук
          </AppButton>
        </div>

        <ReviewsBlock locationId={locationId} feedbacks={feedbacks} />
      </section>
    </div>
  );
}
