import type { Feedback } from "./feedback";

export interface LocationDetails {
  _id: string;
  name: string;
  locationType: string;
  region: string;
  rate: number;
  description: string;
  image: string;
  ownerId: string;
  feedbacksId: Feedback[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationsListResponse {
  page: number;
  limit: number;
  totalLocations: number;
  totalPages: number;
  locations: LocationDetails[];
}
