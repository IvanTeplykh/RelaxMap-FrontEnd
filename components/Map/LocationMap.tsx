"use client";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import css from "./MapComponents.module.css";

type Coordinates = {
  lat: number;
  lon: number;
};

type LocationMapProps = {
  coordinates?: Coordinates;
};

const DEFAULT_CENTER = {
  lat: 49.0,
  lng: 31.0,
};

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "visualization"
)[] = ["places"];

export default function LocationMap({ coordinates }: LocationMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (!isLoaded) {
    return <div className={css.loader}>Завантаження карти...</div>;
  }

  const hasCoordinates =
    coordinates &&
    typeof coordinates.lat === "number" &&
    typeof coordinates.lon === "number";

  const center = hasCoordinates
    ? {
        lat: coordinates.lat,
        lng: coordinates.lon,
      }
    : DEFAULT_CENTER;

  return (
    <div className={css.mapWrapper}>
      <GoogleMap
        mapContainerClassName={css.mapContainer}
        center={center}
        zoom={hasCoordinates ? 14 : 5}
        options={{ disableDefaultUI: true }}
      >
        {hasCoordinates && (
          <MarkerF
            position={{
              lat: coordinates.lat,
              lng: coordinates.lon,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
