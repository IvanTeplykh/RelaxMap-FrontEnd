"use client";

import {
  GoogleMap,
  MarkerF,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import css from "./MapComponents.module.css";

type Coordinates = {
  lat: number;
  lon: number;
};

type LocationMapProps = {
  coordinates?: Coordinates;
  name?: string;
};

const DEFAULT_CENTER = {
  lat: 49.0,
  lng: 31.0,
};

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
];

export default function LocationMap({ coordinates, name }: LocationMapProps) {
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
        zoom={hasCoordinates ? 12.5 : 5.6}
        options={{
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {hasCoordinates && (
          <>
            <MarkerF
              position={{
                lat: coordinates.lat,
                lng: coordinates.lon,
              }}
            />
            {name && (
              <OverlayViewF
                position={{
                  lat: coordinates.lat,
                  lng: coordinates.lon,
                }}
                mapPaneName="overlayMouseTarget"
              >
                <div
                  style={{
                    position: "absolute",
                    transform: "translate(16px, -28px)",
                    color: "var(--color-red, #b00101)",
                    textShadow:
                      "0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "1.2",
                    pointerEvents: "none",
                    fontFamily: "Montserrat, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </div>
              </OverlayViewF>
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
}
