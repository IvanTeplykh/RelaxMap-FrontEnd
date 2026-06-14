import { Location } from "@/types/profile";

export type LocationTypeItem = {
  slug: string;
  type: string;
  shortDescription?: string;
};

export function normalizeLocationsByType(
  locations: Location[],
  locationTypes: LocationTypeItem[],
): Location[] {
  const map = locationTypes.reduce<Record<string, string>>((acc, item) => {
    acc[item.slug] = item.type;
    return acc;
  }, {});

  return locations.map((location) => ({
    ...location,
    locationType: map[location.locationType] ?? location.locationType,
  }));
}
