import type { LocationsResponse, UserProfile } from "@/types/profile";

// Same approach as lib/authApi.ts: the client only ever calls same-origin
// /api/* routes; the server route handlers forward to the backend (API_URL).
async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`/api/users${path}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getUserProfile(id: string): Promise<UserProfile> {
  return getJson<UserProfile>(`/${id}`);
}

export function getUserLocations(
  id: string,
  page: number,
  perPage = 6,
): Promise<LocationsResponse> {
  return getJson<LocationsResponse>(
    `/${id}/locations?page=${page}&perPage=${perPage}`,
  );
}

export async function updateCurrentUser(
  formData: FormData,
): Promise<UserProfile> {
  const response = await fetch("/api/users", {
    method: "PATCH",
    body: formData,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as UserProfile;
}