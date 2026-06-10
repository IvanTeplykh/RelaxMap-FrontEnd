import css from "./AuthNav.module.css";
import { AppLink } from "../../ui";

interface AuthNavProps {
  isAuth: boolean;
}

export default function AuthNav({ isAuth }: AuthNavProps) {
  return (
    <ul className={css.authNav}>
      {!isAuth ? (
        <>
          <li>
            <AppLink href="/login" variant="secondary" className={css.authLink}>
              Вхід
            </AppLink>
          </li>
          <li>
            <AppLink href="/signup" variant="primary" className={css.authLink}>
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
          >
            Поділитись локацією
          </AppLink>
        </li>
      )}
    </ul>
  );
}
