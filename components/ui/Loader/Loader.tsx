import React from "react";
import css from "./Loader.module.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "white";
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}

export const Loader = ({
  size = "md",
  variant = "primary",
  fullScreen = false,
  overlay = false,
  className = "",
}: LoaderProps) => {
  const spinnerClass = `${css.spinner} ${css[size]} ${css[variant]} ${className}`.trim();

  const content = (
    <div className={spinnerClass} role="status" aria-label="loading">
      <svg className={css.svg} viewBox="0 0 50 50">
        <circle
          className={css.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );

  if (fullScreen) {
    return <div className={css.fullScreenOverlay}>{content}</div>;
  }

  if (overlay) {
    return <div className={css.relativeOverlay}>{content}</div>;
  }

  return content;
};
