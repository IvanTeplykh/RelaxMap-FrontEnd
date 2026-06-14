import { Stars } from "@/components/locations/LocationCard/Stars";
import css from "./FeedbacksCard.module.css";
import { FeedbackWithLocation } from "@/types/feedbacks";

interface FeedbacksCardProps {
  feedback: FeedbackWithLocation;
}

export default function FeedbacksCard({ feedback }: FeedbacksCardProps) {
  return (
    <div className={css.feedbacksCardWrapper}>
      <div className={css.feedbacksStarsWrapper}>
        <Stars rate={feedback.rate} />
      </div>

      <p className={css.feedbacksCardDescription}>{feedback.description}</p>
      <p className={css.feedbacksCardAuthor}>{feedback.userName}</p>
      <p className={css.feedbacksCardLocation}>
        {feedback.locationName ?? "Невідома локація"}
      </p>
    </div>
  );
}
