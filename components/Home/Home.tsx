import Features from "./Features/Features";
import css from "./Home.module.css";
import Intro from "./Intro/Intro";
import Popular from "./Popular/Popular";
import { normalizeLocationsByType } from "@/utils/getLocationsWithNormalizedTypes";
import { getLocationTypes } from "@/lib/locationsApi";
import Feedbacks from "./Feedbacks/Feedbacks";
import { getAllFeedbacksSorted } from "@/lib/feedbacks";
import { getAllLocations } from "@/utils/getAllLocations";
import getFeedbackWithLocationName from "@/utils/getFeedbackWithLocationName";

export default async function Home() {
  const [locations, locationTypes, feedbacks] = await Promise.all([
    getAllLocations(),
    getLocationTypes(),
    getAllFeedbacksSorted(),
  ]);

  const normalizedLocations = normalizeLocationsByType(
    locations,
    locationTypes,
  );

  const normalizedFeedbacks = getFeedbackWithLocationName(
    feedbacks,
    normalizedLocations,
  );

  return (
    <div className={css.homeWrapper}>
      <Intro />
      <Features />
      <Popular locations={normalizedLocations} />
      <Feedbacks feedbacks={normalizedFeedbacks} />
    </div>
  );
}
