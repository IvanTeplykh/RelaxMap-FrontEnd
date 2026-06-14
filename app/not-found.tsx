import { AppLink } from "@/components/ui/Button/Button";
import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={css.notFoundContainer}>
      <div className={css.contentCard}>
        <div className={css.illustrationWrapper}>
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css.illustration}
          >
            <path
              d="M10 160C40 140 80 170 120 150C160 130 180 150 190 160V190H10V160Z"
              fill="var(--color-coral-lighter)"
              opacity="0.5"
            />
            <path
              d="M30 170C70 155 110 180 150 165C170 157 185 168 190 172V190H30V170Z"
              fill="var(--color-coral-light)"
              opacity="0.3"
            />
            <polygon
              points="40,165 30,185 50,185"
              fill="var(--color-green)"
              opacity="0.6"
            />
            <polygon
              points="45,160 38,175 52,175"
              fill="var(--color-green)"
              opacity="0.8"
            />
            <polygon
              points="160,170 150,190 170,190"
              fill="var(--color-green)"
              opacity="0.6"
            />
            <polygon
              points="165,163 157,180 173,180"
              fill="var(--color-green)"
              opacity="0.8"
            />

            {/* Broken path/dashed line */}
            <path
              d="M50 140C70 120 100 130 110 110"
              stroke="var(--color-neutral-light)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />

            {/* Map pin */}
            <g className={css.pinGroup}>
              <path
                d="M100 40C83.4315 40 70 53.4315 70 70C70 95 100 125 100 125C100 125 130 95 130 70C130 53.4315 116.569 40 100 40Z"
                fill="var(--color-coral-dark)"
              />
              <circle cx="100" cy="70" r="10" fill="white" />
              {/* Question mark inside white circle */}
              <text
                x="100"
                y="75"
                fill="var(--color-coral-dark)"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="inherit"
              >
                ?
              </text>
            </g>

            {/* Floating clouds */}
            <path
              d="M30 65C30 59.5 34.5 55 40 55C41.4 55 42.7 55.3 43.9 55.8C45.3 52.4 48.7 50 52.6 50C57.4 50 61.4 53.4 62.2 58C62.7 57.9 63.2 57.9 63.7 57.9C67.7 57.9 71 61.2 71 65.2C71 69.2 67.7 72.5 63.7 72.5H40C34.5 72.5 30 68 30 65Z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>

        <h1 className={css.title}>404</h1>
        <h2 className={css.subtitle}>Сторінку не знайдено</h2>
        <p className={css.description}>
          Схоже виникла помилка, спробуйте перейти на іншу сторінку.
        </p>
        <div className={css.actions}>
          <AppLink href="/" variant="primary" className={css.button}>
            Повернутися на головну
          </AppLink>
          <AppLink href="/locations" variant="secondary" className={css.button}>
            Знайти локації
          </AppLink>
        </div>
      </div>
    </main>
  );
}
