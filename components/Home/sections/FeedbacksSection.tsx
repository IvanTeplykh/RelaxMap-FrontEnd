import Feedbacks from "../Feedbacks/Feedbacks";
import { getAllLocations } from "@/utils/getAllLocations";
import { getAllFeedbacksSorted } from "@/lib/feedbacks";
import getFeedbackWithLocationName from "@/utils/getFeedbackWithLocationName";

export default async function FeedbacksSection() {
  const locations = await getAllLocations();
  const feedbacks = await getAllFeedbacksSorted(locations);
  const normalizedFeedbacks = getFeedbackWithLocationName(feedbacks, locations);

  return <Feedbacks feedbacks={normalizedFeedbacks} />;
}
