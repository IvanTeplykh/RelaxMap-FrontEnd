import type { Feedback } from "@/types/feedbacks";
import css from "./ReviewsBlock.module.css";

interface Props {
  locationId: string;
  feedbacks: Feedback[];
}

export const ReviewsBlock = ({ locationId, feedbacks }: Props) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Відгуки користувачів</h2>

      <div className={css.placeholder}>
        <p className={css.subtext}>
          Усього знайдено відгуків для цієї локації:
          <strong>{feedbacks.length}</strong>
        </p>
      </div>
    </div>
  );
};
