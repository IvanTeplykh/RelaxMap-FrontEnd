import Popular from "../Popular/Popular";
import { getAllLocations } from "@/utils/getAllLocations";
import { getLocationTypes } from "@/lib/locationsApi";
import { normalizeLocationsByType } from "@/utils/getLocationsWithNormalizedTypes";

export default async function PopularSection() {
  const [locations, locationTypes] = await Promise.all([
    getAllLocations(),
    getLocationTypes(),
  ]);

  const normalizedLocations = normalizeLocationsByType(
    locations,
    locationTypes,
  );

  return <Popular locations={normalizedLocations} />;
}
