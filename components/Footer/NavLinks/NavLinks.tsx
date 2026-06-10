import Link from "next/link";
import css from "./NavLinks.module.css";

export default function NavLinks() {
  return (
    <nav className={css.navColumn} aria-label="Footer navigation">
      <ul className={css.linkList}>
        <li>
          <Link href="/" className={css.navLink}>
            Головна
          </Link>
        </li>
        <li>
          <Link href="/places" className={css.navLink}>
            Місця відпочинку
          </Link>
        </li>
      </ul>
    </nav>
  );
}

