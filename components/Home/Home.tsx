import { Suspense } from "react";
import Features from "./Features/Features";
import css from "./Home.module.css";
import Intro from "./Intro/Intro";
import PopularSection from "./sections/PopularSection";
import FeedbacksSection from "./sections/FeedbacksSection";

export default function Home() {
  return (
    <div className={css.homeWrapper}>
      <Intro />
      <Features />

      <Suspense fallback={<div />}>
        <PopularSection />
      </Suspense>

      <Suspense fallback={<div />}>
        <FeedbacksSection />
      </Suspense>
    </div>
  );
}
