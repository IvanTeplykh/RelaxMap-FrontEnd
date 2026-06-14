import axios from "axios";
import type { Location } from "@/types/profile";

const publicApi = axios.create({ baseURL: "/api" });
const privateApi = axios.create({ baseURL: "/api", withCredentials: true });

export interface CreateLocationPayload {
  name: string;
  locationType: string;
  region: string;
  description: string;
  image: File;
}

interface GetLocationsParams {
  page: number;
  limit: number;
  search?: string;
  region?: string;
  locationType?: string;
  sort?: string;
}
interface LocationsResponse {
  page: number;
  limit: number;
  totalLocations: number;
  totalPages: number;
  locations: Location[];
}
export type LocationCategoryOption = {
  label: string;
  value: string;
};

export interface LocationType {
  _id: string;
  type: string;
  slug: string;
  shortDescription?: string;
}
export interface Region {
  _id: string;
  region?: string;
  name?: string;
  type?: string;
  slug: string;
}
export const getLocationTypes = async (): Promise<LocationType[]> => {
  const { data } = await publicApi.get<LocationType[]>(
    "/categories/location-types",
  );
  return data;
};
export const getRegions = async (): Promise<Region[]> => {
  const { data } = await publicApi.get<Region[]>("/categories/regions");
  return data;
};
export const getLocations = async ({
  page,
  limit,
  search,
  region,
  locationType,
  sort,
}: GetLocationsParams): Promise<LocationsResponse> => {
  const { data } = await publicApi.get<LocationsResponse>("/locations", {
    params: {
      page,
      limit,
      search: search || undefined,
      region: region || undefined,
      locationType: locationType || undefined,
      sort: sort || undefined,
    },
  });
  return data;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
};

export const createLocation = async ({
  name,
  locationType,
  region,
  description,
  image,
}: CreateLocationPayload): Promise<Location> => {
  const formData = new FormData();
  formData.append("name", name.trim());
  formData.append("locationType", locationType);
  formData.append("region", region);
  formData.append("description", description.trim());
  formData.append("image", image);

  try {
    const { data } = await privateApi.post<Location>("/locations", formData);
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Не вдалося створити локацію. Спробуйте ще раз."),
    );
  }
};
