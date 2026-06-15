import { Suspense } from "react";
import { LocationsPage } from "@/components/locations/LocationsPage/LocationsPage";
import css from "./page.module.css";

export default function LocationsRoutePage() {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <Suspense fallback={null}>
          <LocationsPage />
        </Suspense>
      </div>
    </div>
  );
}
