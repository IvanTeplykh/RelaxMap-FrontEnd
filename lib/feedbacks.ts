import axios from "axios";
import { Feedback, FeedbacksResponse } from "@/types/feedbacks";
import type { Location } from "@/types/profile";

const publicApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export interface AddFeedbackPayload {
  locationId: string;
  rate: number;
  description: string;
}

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

export async function getAllFeedbacksSorted(
  locations: Location[],
): Promise<Feedback[]> {
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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addFeedback(payload: AddFeedbackPayload) {
  const { data } = await privateApi.post("/feedbacks", payload);

  return data;
}
