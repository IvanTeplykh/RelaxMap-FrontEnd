import type { RefObject } from "react";
import type { Location } from "@/types/profile";
import { AppButton } from "@/components/ui/Button/Button";
import { LocationCard } from "../LocationCard/LocationCard";
import css from "./LocationsGrid.module.css";
interface LocationsGridProps {
  locations: Location[];
  locationTypeLabels: Record<string, string>;
  listRef: RefObject<HTMLUListElement | null>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}
export const LocationsGrid = ({
  locations,
  locationTypeLabels,
  listRef,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: LocationsGridProps) => {
  return (
    <>
      <ul className={css.list} ref={listRef}>
        {locations.map((location) => (
          <li key={location._id} className={css.locationCard}>
            <LocationCard
              location={location}
              locationTypeLabel={
                locationTypeLabels[location.locationType] ||
                location.locationType
              }
            />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div className={css.loadMoreWrapper}>
          <AppButton
            className={css.loadMoreButton}
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
          >
            Показати ще
          </AppButton>
        </div>
      )}
    </>
  );
};
