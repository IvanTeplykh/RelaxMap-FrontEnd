import { useState, useEffect, KeyboardEvent } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { AppButton } from "@/components/ui";
import css from "./MapComponents.module.css";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "visualization"
)[] = ["places"];
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const removeUkraine = (address: string): string => {
  if (!address) return "";
  return address.replace(/^[^,]+,\s*/, "");
};

interface LocationInputWithMapProps {
  location: string;
  setLocation: (value: string) => void;
  className?: string;
  inputWrapperClassName?: string;
  onCoordinatesChange?: (coords: { lat: number; lon: number } | null) => void;
  initialCoordinates?: { lat: number; lon: number } | null;
}

export default function LocationInputWithMap({
  location,
  setLocation,
  className,
  inputWrapperClassName,
  onCoordinatesChange,
  initialCoordinates,
}: LocationInputWithMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded)
    return (
      <div className={inputWrapperClassName}>
        <input className={className} placeholder="Завантаження..." disabled />
      </div>
    );

  return (
    <LocationInputWithMapInner
      location={location}
      setLocation={setLocation}
      className={className}
      inputWrapperClassName={inputWrapperClassName}
      onCoordinatesChange={onCoordinatesChange}
      initialCoordinates={initialCoordinates}
    />
  );
}

function LocationInputWithMapInner({
  location,
  setLocation,
  className,
  inputWrapperClassName,
  onCoordinatesChange,
  initialCoordinates,
}: LocationInputWithMapProps) {
  const [value, setValue] = useState(removeUkraine(location) || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    initialCoordinates
      ? { lat: initialCoordinates.lat, lng: initialCoordinates.lon }
      : null,
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);

  // sync external value
  useEffect(() => {
    const cleaned = removeUkraine(location);
    setValue(cleaned || "");
    if (!cleaned && !initialCoordinates) {
      setPosition(null);
    }
  }, [location, initialCoordinates]);

  // notify parent of coordinate changes
  useEffect(() => {
    if (onCoordinatesChange) {
      if (position) {
        onCoordinatesChange({ lat: position.lat, lon: position.lng });
      } else {
        onCoordinatesChange(null);
      }
    }
  }, [position, onCoordinatesChange]);

  // Geocode initial location or reverse-geocode initial coordinates if provided
  useEffect(() => {
    if (initialCoordinates && !isInitialized) {
      setIsInitialized(true);
      const reverseGeocodeInitial = async () => {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${initialCoordinates.lat},${initialCoordinates.lon}&key=${API_KEY}&language=uk`,
          );
          const data = await res.json();
          if (data.results?.[0]) {
            const formatted = data.results[0].formatted_address;
            const cleaned = removeUkraine(formatted);
            setValue(cleaned);
            setLocation(cleaned);
            setPosition({ lat: initialCoordinates.lat, lng: initialCoordinates.lon });
          }
        } catch (err) {
          console.error("Reverse geocoding error:", err);
        }
      };
      reverseGeocodeInitial();
    } else if (location && !isInitialized) {
      setIsInitialized(true);
      const geocodeInitial = async () => {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              location,
            )}&key=${API_KEY}&language=uk`,
          );
          const data = await res.json();
          if (data.results?.[0]?.geometry?.location) {
            const loc = data.results[0].geometry.location;
            setPosition({ lat: loc.lat, lng: loc.lng });
          }
        } catch (err) {
          console.error("Geocoding error:", err);
        }
      };
      geocodeInitial();
    }
  }, [location, initialCoordinates, isInitialized, setLocation]);

  // autocomplete (NEW API)
  useEffect(() => {
    if (!value) return setSuggestions([]);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": API_KEY,
            },
            body: JSON.stringify({
              input: value,
              languageCode: "uk",
            }),
          },
        );

        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Autocomplete error:", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  const handleSelect = async (item: any) => {
    const text = item.placePrediction.text.text;
    const placeId = item.placePrediction.placeId;

    setValue(removeUkraine(text));
    setLocation(removeUkraine(text));
    setSuggestions([]);
    setHasError(false);

    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?languageCode=uk`,
        {
          headers: {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "location,addressComponents",
          },
        },
      );

      const data = await res.json();

      const city = data.addressComponents?.find((c: any) =>
        c.types.includes("locality"),
      )?.longText;
      const country = data.addressComponents?.find((c: any) =>
        c.types.includes("country"),
      )?.longText;

      const formatted = city && country ? `${country}, ${city}` : text;

      setValue(removeUkraine(formatted));
      setLocation(removeUkraine(formatted));

      if (data.location?.latitude && data.location?.longitude) {
        setPosition({
          lat: data.location.latitude,
          lng: data.location.longitude,
        });
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (err) {
      console.error("Place details error:", err);
      setHasError(true);
    }
  };

  const handleSearch = async () => {
    if (!value) return;

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          value,
        )}&key=${API_KEY}&language=uk`,
      );
      const data = await res.json();

      if (data.results?.[0]) {
        const loc = data.results[0].geometry.location;
        const components = data.results[0].address_components;

        const city = components.find((c: any) =>
          c.types.includes("locality"),
        )?.long_name;
        const country = components.find((c: any) =>
          c.types.includes("country"),
        )?.long_name;

        const formatted =
          city && country
            ? `${country}, ${city}`
            : data.results[0].formatted_address;

        setPosition({ lat: loc.lat, lng: loc.lng });
        setLocation(removeUkraine(formatted));
        setValue(removeUkraine(formatted));
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (err) {
      console.error("Search error:", err);
      setHasError(true);
    } finally {
      if (document.activeElement instanceof HTMLButtonElement) {
        document.activeElement.blur();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const center = position || { lat: 50.4501, lng: 30.5234 };

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setPosition({ lat, lng });
    setHasError(false);

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=uk`,
      );

      const data = await res.json();

      if (data.results?.[0]) {
        const components = data.results[0].address_components;
        const city = components.find((c: any) =>
          c.types.includes("locality"),
        )?.long_name;
        const country = components.find((c: any) =>
          c.types.includes("country"),
        )?.long_name;

        const formatted =
          city && country
            ? `${country}, ${city}`
            : data.results[0].formatted_address;

        setLocation(removeUkraine(formatted));
        setValue(removeUkraine(formatted));
        setHasError(false);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  return (
    <div className={`${inputWrapperClassName} ${css.inputWrapper}`}>
      <div className={css.inputAndButtonWrapper}>
        <div className={css.autocompleteWrapper}>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setLocation(e.target.value);
              setHasError(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Введіть назву місця"
            className={`${css.input} ${hasError ? css.inputError : ""} ${className || ""}`.trim()}
          />

          {suggestions.length > 0 && (
            <ul className={css.suggestionsList}>
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(s)}
                  className={css.suggestionItem}
                >
                  {s.placePrediction.text.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <AppButton
          onClick={handleSearch}
          variant="secondary"
          className={css.toggleMapBtn}
        >
          Пошук
        </AppButton>
      </div>

      {hasError && (
        <p className={css.errorMessage}>На жаль таке місце ми не знайшли</p>
      )}

      <div className={css.staticMapContainer}>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName={css.mapContainer}
          onClick={handleMapClick}
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
          {position && <MarkerF position={position} />}
        </GoogleMap>
      </div>
    </div>
  );
}
