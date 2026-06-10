import css from "./NavList.module.css";
import Link from "next/link";

interface NavListProps {
  isAuth: boolean;
}

export default function NavList({ isAuth }: NavListProps) {
  return (
    <ul className={css.navList}>
      <li className={css.navItem}>
        <Link href="/">Головна</Link>
      </li>
      <li className={css.navItem}>
        <Link href="/locations">Місця відпочинку</Link>
      </li>
      {isAuth && (
        <li className={css.navItem}>
          <Link href="/pro">Мій Профіль</Link>
        </li>
      )}
    </ul>
  );
}
