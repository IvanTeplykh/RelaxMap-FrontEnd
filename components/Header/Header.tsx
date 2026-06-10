"use client";

import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import { useState } from "react";
import { useAuthStore } from "@/store";
import Profile from "./Profile/Profile";
import NavList from "./NavList/NavList";
import AuthNav from "./AuthNav/AuthNav";
import Logo from "./Logo/Logo";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

export default function Header() {
  const pathname = usePathname();
  const isAuth = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={css.headerWrapper}>
      <Logo />
      <div className={css.navWrapper}>
        {pathname !== "/login" && pathname !== "/register" && (
          <>
            <NavList isAuth={isAuth} />
            <AuthNav isAuth={isAuth} />
            {isAuth && <Profile user={user} />}
            <BurgerMenu
              isMenuOpen={isMenuOpen}
              handleMenuClick={handleMenuClick}
            />
          </>
        )}
      </div>
    </div>
  );
}
