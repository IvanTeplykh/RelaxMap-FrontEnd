import { LocationForm } from "@/components/locations/index";
import styles from "./page.module.css";

export default function CreateLocationPage() {
  return (
    <div className={styles.page}>
      <section
        className={styles.section}
        aria-labelledby="create-location-title"
      >
        <h1 className={styles.title} id="create-location-title">
          Додавання нового місця
        </h1>
        <LocationForm mode="create" />
      </section>
    </div>
  );
}
