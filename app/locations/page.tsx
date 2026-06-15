import { Suspense } from "react";
import { LocationsPage } from "@/components/locations/LocationsPage/LocationsPage";
import css from "./page.module.css";
import { Loader } from "@/components/ui";

export default function LocationsRoutePage() {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <Suspense fallback={<Loader size="lg" />}>
          <LocationsPage />
        </Suspense>
      </div>
    </div>
  );
}
