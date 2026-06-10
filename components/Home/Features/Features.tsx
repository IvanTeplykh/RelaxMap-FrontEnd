import css from "./Features.module.css";

export default function Features() {
  return (
    <section className={css.features}>
      <div className={css.container}>
        <h2 className={css.featuresTitle}>Ключові переваги</h2>
        <ul className={css.featuresList}>
          <li className={css.featuresItem}>
            <svg className={css.featuresItemIcon}>
              <use
                className={css.featuresItemIconUse}
                href="/sprite.svg#check_box"
              />
            </svg>
            <h3 className={css.featuresItemTitle}>Реальні відгуки</h3>
            <p className={css.featuresItemDescription}>
              Користувачі діляться чесними враженнями, щоб ви робили правильний
              вибір.
            </p>
          </li>
          <li className={css.featuresItem}>
            <svg className={css.featuresItemIcon}>
              <use
                className={css.featuresItemIconUse}
                href="/sprite.svg#filter"
              />
            </svg>
            <h3 className={css.featuresItemTitle}>Зручні фільтри</h3>
            <p className={css.featuresItemDescription}>
              Шукайте за типом локації, регіоном, наявністю зручностей та іншими
              критеріями.
            </p>
          </li>
          <li className={`${css.featuresItem} ${css.featuresItemLast}`}>
            <svg className={css.featuresItemIcon}>
              <use
                className={css.featuresItemIconUse}
                href="/sprite.svg#communication"
              />
            </svg>
            <h3 className={css.featuresItemTitle}>Спільнота мандрівників</h3>
            <p className={css.featuresItemDescription}>
              Додавайте власні улюблені місця та діліться своїми неймовірними
              знахідками.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
