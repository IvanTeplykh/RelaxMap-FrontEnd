import Link from "next/link";
import css from "./Logo.module.css";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <div className={css.logoWrapper} onClick={onClick}>
      <Link href="/" className={css.logo}>
        <svg className={css.logoIconWrapper}>
          <use className={css.logoIcon} href="/sprite.svg#map_search"></use>
        </svg>
        <p className={css.logoText}>Relax Map</p>
      </Link>
    </div>
  );
}
