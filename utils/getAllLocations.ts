import { cache } from "react";
import { getLocations } from "@/lib/locationsApi";
import type { Location } from "@/types/profile";

export const getAllLocations = cache(async (): Promise<Location[]> => {
  let page = 1;
  let totalPages = 1;
  const allLocations: Location[] = [];

  do {
    const response = await getLocations({ page, limit: 100 });
    allLocations.push(...response.locations);
    totalPages = response.totalPages;
    page += 1;
  } while (page <= totalPages);

  return allLocations;
});
