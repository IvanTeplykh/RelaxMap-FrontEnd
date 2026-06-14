import css from "./AuthNav.module.css";
import { AppLink } from "../../ui";

interface AuthNavProps {
  isAuth: boolean;
  onNavigate?: () => void;
}

export default function AuthNav({ isAuth, onNavigate }: AuthNavProps) {
  return (
    <ul className={css.authNav}>
      {!isAuth ? (
        <>
          <li>
            <AppLink
              href="/login"
              variant="secondary"
              className={css.authLink}
              onClick={onNavigate}
            >
              Вхід
            </AppLink>
          </li>
          <li>
            <AppLink
              href="/register"
              variant="primary"
              className={css.authLink}
              onClick={onNavigate}
            >
              Реєстрація
            </AppLink>
          </li>
        </>
      ) : (
        <li>
          <AppLink
            href="/locations/add"
            variant="primary"
            className={css.authLink}
            onClick={onNavigate}
          >
            Поділитись локацією
          </AppLink>
        </li>
      )}
    </ul>
  );
}
