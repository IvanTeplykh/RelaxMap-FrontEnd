"use client";

import { useEffect } from "react";
import { AppLink, AppButton } from "@/components/ui/Button/Button";
import css from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main className={css.errorContainer}>
      <div className={css.contentCard}>
        <div className={css.illustrationWrapper}>
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css.illustration}
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="var(--color-coral-dark)"
              strokeWidth="6"
            />
            <circle
              cx="100"
              cy="100"
              r="72"
              stroke="var(--color-coral-lighter)"
              strokeWidth="2"
            />

            <line
              x1="100"
              y1="20"
              x2="100"
              y2="30"
              stroke="var(--color-coral-dark)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="100"
              y1="170"
              x2="100"
              y2="180"
              stroke="var(--color-coral-dark)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="100"
              x2="30"
              y2="100"
              stroke="var(--color-coral-dark)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="170"
              y1="100"
              x2="180"
              y2="100"
              stroke="var(--color-coral-dark)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <text
              x="100"
              y="44"
              fill="var(--color-coral-dark)"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              N
            </text>
            <text
              x="100"
              y="166"
              fill="var(--color-coral-dark)"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              S
            </text>

            <g className={css.needleGroup}>
              <path d="M100 100L92 100L100 48Z" fill="var(--color-red)" />
              <path
                d="M100 100L108 100L100 48Z"
                fill="var(--color-coral-dark)"
                opacity="0.8"
              />
              <path
                d="M100 100L92 100L100 152Z"
                fill="var(--color-neutral-light)"
              />
              <path
                d="M100 100L108 100L100 152Z"
                fill="var(--color-neutral-lighter)"
              />
              <circle
                cx="100"
                cy="100"
                r="8"
                fill="var(--color-white)"
                stroke="var(--color-coral-dark)"
                strokeWidth="3"
              />
            </g>

            <g className={css.warningBadge}>
              <circle cx="150" cy="150" r="22" fill="var(--color-red)" />
              <path
                d="M150 138L150 152"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="150" cy="158" r="2.5" fill="white" />
            </g>
          </svg>
        </div>

        <h1 className={css.title}>Упс!</h1>
        <h2 className={css.subtitle}>Щось пішло не так</h2>
        <p className={css.description}>
          Під час завантаження сторінки виникла технічна помилка. Ми вже
          працюємо над її усуненням. Будь ласка, спробуйте оновити сторінку або
          повернутися пізніше.
        </p>

        {error.digest && (
          <div className={css.digestWrapper}>
            <span className={css.digestLabel}>ID помилки:</span>
            <code className={css.digestCode}>{error.digest}</code>
          </div>
        )}

        <div className={css.actions}>
          <AppButton onClick={reset} variant="primary" className={css.button}>
            Спробувати знову
          </AppButton>
          <AppLink href="/" variant="secondary" className={css.button}>
            На головну
          </AppLink>
        </div>
      </div>
    </main>
  );
}
