"use client";

import { useEffect } from "react";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import css from "./error.module.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global layout runtime error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className={css.globalErrorBody}>
        <main className={css.errorContainer}>
          <div className={css.contentCard}>
            {/* Custom SVG Compass Illustration */}
            <div className={css.illustrationWrapper}>
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.illustration}
              >
                {/* Compass outer ring */}
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

                {/* Compass rose markings */}
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

                {/* N, S markers */}
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

                {/* Spinning needle */}
                <g className={css.needleGroup}>
                  {/* North needle */}
                  <path d="M100 100L92 100L100 48Z" fill="var(--color-red)" />
                  <path
                    d="M100 100L108 100L100 48Z"
                    fill="var(--color-coral-dark)"
                    opacity="0.8"
                  />
                  {/* South needle */}
                  <path
                    d="M100 100L92 100L100 152Z"
                    fill="var(--color-neutral-light)"
                  />
                  <path
                    d="M100 100L108 100L100 152Z"
                    fill="var(--color-neutral-lighter)"
                  />

                  {/* Center pivot */}
                  <circle
                    cx="100"
                    cy="100"
                    r="8"
                    fill="var(--color-white)"
                    stroke="var(--color-coral-dark)"
                    strokeWidth="3"
                  />
                </g>

                {/* Warning / Error badge */}
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

            <h1 className={css.title}>Критична помилка</h1>
            <h2 className={css.subtitle}>Системний збій завантаження</h2>
            <p className={css.description}>
              Виникла критична помилка під час запуску додатку. Спробуйте
              оновити сторінку або зв'яжіться з нашою підтримкою.
            </p>

            {error.digest && (
              <div className={css.digestWrapper}>
                <span className={css.digestLabel}>ID помилки:</span>
                <code className={css.digestCode}>{error.digest}</code>
              </div>
            )}

            <div className={css.actions}>
              <button
                onClick={reset}
                className={`${css.globalBtn} ${css.globalBtnPrimary}`}
              >
                Спробувати знову
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className={`${css.globalBtn} ${css.globalBtnSecondary}`}
              >
                На головну
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
