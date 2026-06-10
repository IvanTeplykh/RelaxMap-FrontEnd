import Features from "./Features/Features";
import css from "./Home.module.css";
import Intro from "./Intro/Intro";

export default function Home() {
  return (
    <div className={css.homeWrapper}>
      <Intro />
      <Features />
      <section className={css.popular}></section>
      <section className={css.testimonials}></section>
    </div>
  );
}
