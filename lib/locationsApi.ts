import axios from "axios";
import type { Location } from "@/types/profile";
import type { LocationDetails } from "@/types/location";

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const normalizeLocationDescription = (description: string) =>
  description.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

export interface CreateLocationPayload {
  name: string;
  locationType: string;
  region: string;
  description: string;
  image: File;
  coordinates?: {
    lat: number;
    lon: number;
  } | null;
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
  coordinates,
}: CreateLocationPayload): Promise<Location> => {
  const formData = new FormData();
  formData.append("name", name.trim());
  formData.append("locationType", locationType);
  formData.append("region", region);
  formData.append("description", normalizeLocationDescription(description));
  formData.append("image", image);

  if (coordinates) {
    formData.append("coordinates[lat]", coordinates.lat.toString());
    formData.append("coordinates[lon]", coordinates.lon.toString());
  }

  try {
    const { data } = await privateApi.post<Location>("/locations", formData);
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Не вдалося створити локацію. Спробуйте ще раз."),
    );
  }
};

export interface UpdateLocationPayload {
  name: string;
  locationType: string;
  region: string;
  description: string;
  image?: File | null;
  coordinates?: {
    lat: number;
    lon: number;
  } | null;
}

export const getLocationById = async (id: string): Promise<Location> => {
  try {
    const { data } = await publicApi.get<Location>(`/locations/${id}`);
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Не вдалося завантажити дані локації."),
    );
  }
};

export const getLocationDetailsById = async (
  locationId: string,
): Promise<LocationDetails> => {
  try {
    const { data } = await publicApi.get<LocationDetails>(
      `/locations/${locationId}`,
    );
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Не вдалося завантажити детальні дані локації."),
    );
  }
};

export const updateLocation = async (
  id: string,
  {
    name,
    locationType,
    region,
    description,
    image,
    coordinates,
  }: UpdateLocationPayload,
): Promise<Location> => {
  const formData = new FormData();
  formData.append("name", name.trim());
  formData.append("locationType", locationType);
  formData.append("region", region);
  formData.append("description", normalizeLocationDescription(description));

  if (image) {
    formData.append("image", image);
  }
  if (coordinates) {
    formData.append("coordinates[lat]", coordinates.lat.toString());
    formData.append("coordinates[lon]", coordinates.lon.toString());
  }

  try {
    const { data } = await privateApi.patch<Location>(
      `/locations/${id}`,
      formData,
    );
    return data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Не вдалося оновити локацію. Спробуйте ще раз."),
    );
  }
};
