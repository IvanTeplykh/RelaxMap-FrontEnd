import { getAllLocations } from "@/utils/getAllLocations";

export async function getLocationNameByFeedbackId(feedbackId: string) {
  const locations = await getAllLocations();

  const location = locations.find((loc) =>
    loc.feedbacksId?.includes(feedbackId),
  );

  return location?.name ?? null;
}
