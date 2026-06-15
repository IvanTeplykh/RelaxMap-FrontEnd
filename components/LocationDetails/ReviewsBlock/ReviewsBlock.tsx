"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@/components/ui/Icon/Icon";
import { Stars } from "@/components/locations/LocationCard/Stars";

import { Feedback } from "@/types/feedbacks";
import css from "./ReviewsBlock.module.css";

import "swiper/css";
import "swiper/css/navigation";

interface ReviewsBlockProps {
  locationId: string;
  feedbacks: Feedback[];
}

export const ReviewsBlock = ({ feedbacks }: ReviewsBlockProps) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p className={css.noReviews}>Відгуків ще немає. Залиште перший!</p>;
  }

  return (
    <div className={css.reviewsBlockWrapper}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${css.btnPrev}`,
          nextEl: `.${css.btnNext}`,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          375: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className={css.swiper}
      >
        {feedbacks.map((item) => (
          <SwiperSlide key={item._id} className={css.swiperSlide}>
            <div className={css.feedbacksCardWrapper}>
              <div className={css.feedbacksStarsWrapper}>
                <Stars rate={item.rate} />
              </div>
              <p className={css.feedbacksCardDescription}>{item.description}</p>
              <p className={css.feedbacksCardAuthor}>{item.userName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.navigation}>
        <button
          type="button"
          className={css.btnPrev}
          aria-label="Попередній відгук"
        >
          <Icon className={css.iconPrev} name="arrow_back" />
        </button>
        <button
          type="button"
          className={css.btnNext}
          aria-label="Наступний відгук"
        >
          <Icon className={css.iconNext} name="arrow_forward" />
        </button>
      </div>
    </div>
  );
};
