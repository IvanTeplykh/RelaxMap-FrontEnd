import type { FeedbacksResponse } from "@/types/feedback";

async function getJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api/feedbacks${url}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export function getFeedbacks(params: {
  locationId: string;
  page?: number;
  perPage?: number;
}): Promise<FeedbacksResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("locationId", params.locationId);

  if (params.page) searchParams.set("page", String(params.page));
  if (params.perPage) searchParams.set("perPage", String(params.perPage));

  return getJson<FeedbacksResponse>(`?${searchParams.toString()}`);
}
