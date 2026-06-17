"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import styles from "../../add/page.module.css";

import { getLocationById, updateLocation } from "@/lib/locationsApi";
import type { Location } from "@/types/profile";
import {
  LocationForm,
  LocationFormValues,
} from "@/components/locations/LocationForm/LocationForm";

interface EditLocationPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export default function EditLocationPage({ params }: EditLocationPageProps) {
  const router = useRouter();
  const { locationId } = use(params);

  const [locationData, setLocationData] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const data = await getLocationById(locationId);
        setLocationData(data);
      } catch (error) {
        toast.error("Не вдалося завантажити дані локації");
        router.push("/locations");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLocationData();
  }, [locationId, router]);

  const handleSubmit = async (values: LocationFormValues) => {
    await updateLocation(locationId, {
      name: values.name,
      locationType: values.locationType,
      region: values.region,
      description: values.description,
      image: values.image,
      coordinates: values.coordinates,
    });

    router.push(`/locations/${locationId}`);
  };

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>Редагування місця</h1>
        {locationData && (
          <LocationForm
            mode="edit"
            initialValues={{
              name: locationData.name,
              locationType: locationData.locationType,
              region: locationData.region,
              description: locationData.description || "",
              coordinates: locationData.coordinates
                ? {
                    lat: locationData.coordinates.lat,
                    lon: locationData.coordinates.lon,
                  }
                : null,
            }}
            initialImageUrl={locationData.image}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        )}
      </section>
    </div>
  );
}
