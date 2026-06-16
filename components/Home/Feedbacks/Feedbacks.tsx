"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AppButton } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";

import css from "./Feedbacks.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { FeedbackWithLocation } from "@/types/feedbacks";
import FeedbacksCard from "./FeedbacksCard/FeedbacksCard";

interface FeedbackProps {
  feedbacks: FeedbackWithLocation[];
}

export default function Feedbacks({ feedbacks }: FeedbackProps) {
  return (
    <section className={css.feedbacksSection}>
      <div className={css.container}>
        <div className={css.feedbacksHeader}>
          <h2 className={css.feedbacksHeaderTitle}>Останні відгуки</h2>
        </div>
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
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id} className={css.swiperSlide}>
              <FeedbacksCard feedback={feedback} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={css.navigation}>
          <AppButton
            className={css.btnPrev}
            variant="secondary"
            ariaLabel="Previous"
          >
            <Icon className={css.iconPrev} name="arrow_back" />
          </AppButton>
          <AppButton
            className={css.btnNext}
            variant="secondary"
            ariaLabel="Next"
          >
            <Icon className={css.iconNext} name="arrow_forward" />
          </AppButton>
        </div>
      </div>
    </section>
  );
}
