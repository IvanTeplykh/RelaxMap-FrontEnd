"use client";

import css from "./NavList.module.css";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

interface NavListProps {
  isAuth: boolean;
  onNavigate?: () => void;
}

export default function NavList({ isAuth, onNavigate }: NavListProps) {
  const id = useAuthStore((state) => state.user?.id);

  return (
    <ul className={css.navList}>
      <li className={css.navItem}>
        <Link href="/" onClick={onNavigate}>
          Головна
        </Link>
      </li>
      <li className={css.navItem}>
        <Link href="/locations" onClick={onNavigate}>
          Місця відпочинку
        </Link>
      </li>
      {isAuth && (
        <li className={css.navItem}>
          <Link href={`/profile/${id}`} onClick={onNavigate}>
            Мій Профіль
          </Link>
        </li>
      )}
    </ul>
  );
}
