import { Feedback, FeedbackWithLocation } from "@/types/feedbacks";
import { Location } from "@/types/profile";

function toFeedbackId(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "_id" in value) {
    const id = (value as { _id?: unknown })._id;
    return typeof id === "string" ? id : null;
  }
  return null;
}

export default function getFeedbackWithLocationName(
  feedbacks: Feedback[],
  locations: Location[],
): FeedbackWithLocation[] {
  const feedbackIdToLocationName = new Map<string, string>();

  for (const loc of locations) {
    for (const raw of loc.feedbacksId ?? []) {
      const feedbackId = toFeedbackId(raw);
      if (feedbackId) {
        feedbackIdToLocationName.set(feedbackId, loc.name);
      }
    }
  }

  return feedbacks.map((feedback) => ({
    ...feedback,
    locationName: feedbackIdToLocationName.get(feedback._id) ?? null,
  }));
}
