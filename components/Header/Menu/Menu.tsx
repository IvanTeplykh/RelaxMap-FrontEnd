import AuthNav from "../AuthNav/AuthNav";
import NavList from "../NavList/NavList";
import Profile from "../Profile/Profile";
import css from "./Menu.module.css";
import { User } from "@/types/auth";
import { AppLink } from "../../ui";

interface MenuProps {
  user: User | null;
  isAuth: boolean;
}

export default function Menu({ user, isAuth }: MenuProps) {
  return (
    <div className={css.menuWrapper}>
      <NavList isAuth={isAuth} />
      {isAuth ? (
        <div className={css.profileWrapper}>
          <AppLink
            href="/locations/add"
            variant="primary"
            className={css.authLink}
          >
            Поділитись локацією
          </AppLink>
          <Profile user={user} />
        </div>
      ) : (
        <div className={css.authNavWrapper}>
          <AuthNav isAuth={isAuth} />
        </div>
      )}
    </div>
  );
}
