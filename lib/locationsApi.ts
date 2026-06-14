import type { LocationDetails } from "@/types/location";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(`/api/locations${url}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export function getLocationById(id: string): Promise<LocationDetails> {
  return getJson<LocationDetails>(`/${id}`);
}
