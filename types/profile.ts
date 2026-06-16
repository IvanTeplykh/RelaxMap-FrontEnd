export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  articlesAmount: number;
  createdAt: string;
}

export interface Location {
  _id: string;
  name: string;
  locationType: string;
  region: string;
  image: string;
  description?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  /** Average score. May arrive as `rate` or `rating`; missing/0 → 5 empty stars. */
  rate?: number;
  rating?: number;
  feedbacksId?: string[];
  ownerId?: string;
  createdAt: string;
}

export interface LocationsResponse {
  page: number;
  perPage: number;
  totalLocations: number;
  totalPages: number;
  locations: Location[];
}
