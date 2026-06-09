"use client";

import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import Link from "next/link";
import { AppLink } from "../ui";
import { useState } from "react";
import { useAuthStore } from "@/store";

export default function Header() {
  const pathname = usePathname();

  const isAuth = useAuthStore((state) => state.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={css.headerWrapper}>
      <Link href="/" className={css.logo}>
        <svg className={css.logoIconWrapper}>
          <use className={css.logoIcon} href="/sprite.svg#map_search"></use>
        </svg>
        <p className={css.logoText}>Relax Map</p>
      </Link>
      {pathname !== "/login" && pathname !== "/register" && (
        <div className={css.authNav}>
          {!isAuth && (
            <div className={css.authLinksWrapper}>
              <AppLink
                href="/login"
                variant="secondary"
                className={css.authLink}
              >
                Вхід
              </AppLink>
              <AppLink
                href="/register"
                variant="primary"
                className={css.authLink}
              >
                Реєстрація
              </AppLink>
            </div>
          )}
          <button
            type="button"
            onClick={handleMenuClick}
            className={css.menuButton}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <svg
              className={`${css.menuIconSvg} ${isMenuOpen ? css.hidden : css.visible}`}
            >
              <use className={css.menuIcon} href="/sprite.svg#menu" />
            </svg>

            <svg
              className={`${css.menuIconSvg} ${isMenuOpen ? css.visible : css.hidden}`}
            >
              <use className={css.menuIcon} href="/sprite.svg#close" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
