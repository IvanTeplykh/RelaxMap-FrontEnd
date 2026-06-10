import Link from "next/link";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={css.logoWrapper}>
      <Link href="/" className={css.logo}>
        <svg className={css.logoIconWrapper}>
          <use className={css.logoIcon} href="/sprite.svg#map_search"></use>
        </svg>
        <p className={css.logoText}>Relax Map</p>
      </Link>
    </div>
  );
}
