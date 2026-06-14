import axios from "axios";
import { Feedback, FeedbacksResponse } from "@/types/feedbacks";
import { getAllLocations } from "@/utils/getAllLocations";

const publicApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export async function getFeedbacks(
  locationId?: string,
  page = 1,
  perPage = 10,
): Promise<FeedbacksResponse> {
  const { data } = await publicApi.get<FeedbacksResponse>("/feedbacks", {
    params: { locationId, page, perPage },
  });

  return data;
}

export async function getAllFeedbacksSorted(): Promise<Feedback[]> {
  const locations = await getAllLocations();
  const locationsWithFeedbacks = locations.filter(
    (loc) => loc.feedbacksId && loc.feedbacksId.length > 0,
  );

  const results = await Promise.allSettled(
    locationsWithFeedbacks.map((loc) =>
      getFeedbacks(loc._id, 1, loc.feedbacksId!.length),
    ),
  );

  const allFeedbacks: Feedback[] = results.flatMap((result) =>
    result.status === "fulfilled" ? result.value.feedbacks : [],
  );

  return allFeedbacks.sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  );
}

export function getFeedbacksByLocationId(params: {
  locationId: string;
  page?: number;
  perPage?: number;
}): Promise<FeedbacksResponse> {
  return publicApi
    .get<FeedbacksResponse>("/feedbacks", {
      params: {
        locationId: params.locationId,
        page: params.page || undefined,
        perPage: params.perPage || undefined,
      },
    })
    .then((res) => res.data);
}
