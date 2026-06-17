"use client";

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store';
import { getUserLocations, getUserProfile } from '@/lib/usersApi';
import type { LocationsResponse } from '@/types/profile';
import { ProfileHeader } from '@/components/profile/ProfileHeader/ProfileHeader';
import { EmptyLocations } from '@/components/profile/EmptyLocations/EmptyLocations';
import EditProfileModal from '@/components/ui/Modal/EditProfileModal/EditProfileModal';
import { LocationCard } from '@/components/locations';
import { AppButton, Loader } from '@/components/ui';
import styles from './page.module.css';

const PER_PAGE = 6;

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const [isEditOpen, setIsEditOpen] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId as string),
    enabled: Boolean(userId),
  });

  const locationsQuery = useInfiniteQuery({
    queryKey: ["profile-locations", userId],
    queryFn: ({ pageParam }) =>
      getUserLocations(userId as string, pageParam, PER_PAGE),
    enabled: Boolean(userId),
    initialPageParam: 1,
    getNextPageParam: (lastPage: LocationsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const { data: locationTypes = [] } = useQuery({
    queryKey: ['locationTypes'],
    queryFn: async (): Promise<Array<{ slug: string; type: string }>> => {
      const res = await fetch('/api/categories/location-types', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return res.json();
    },
  });

  if (!userId) {
    return null;
  }

  if (profileQuery.isLoading || locationsQuery.isLoading) {
    return <Loader fullScreen />;
  }

  if (profileQuery.isError || locationsQuery.isError || !profileQuery.data) {
    return <p className={styles.State}>Не вдалося завантажити профіль.</p>;
  }

  const profile = profileQuery.data;
  const pages = locationsQuery.data?.pages ?? [];
  const totalLocations = pages[0]?.totalLocations ?? 0;
  const locations = pages.flatMap((page) => page.locations);

  const locationTypeLabels = Object.fromEntries(
    locationTypes.map((item) => [item.slug, item.type]),
  );

  return (
    <div className={styles.Wrapper}>
      <ProfileHeader
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        articlesAmount={totalLocations}
        isOwnProfile={true}
        onEditClick={() => setIsEditOpen(true)}
      />

      {isEditOpen && (
        <EditProfileModal
          user={user}
          userId={userId!}
          currentAvatarUrl={profile.avatarUrl}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {totalLocations === 0 ? (
        <EmptyLocations
          text="Ви ще нічого не публікували, поділіться своєю першою локацією!"
          buttonLabel="Поділитись локацією"
          buttonHref="/locations/add"
        />
      ) : (
        <>
          <ul className={styles.Grid}>
            {locations.map((location) => (
              <li key={location._id}>
                <LocationCard
                  location={location}
                  editable
                  locationTypeLabel={
                    locationTypeLabels[location.locationType] ||
                    location.locationType
                  }
                />
              </li>
            ))}
          </ul>

          {locationsQuery.hasNextPage && (
            <div className={styles.MoreWrap}>
              <AppButton
                variant="primary"
                onClick={() => void locationsQuery.fetchNextPage()}
                disabled={locationsQuery.isFetchingNextPage}
                className={styles.MoreButton}
              >
                {locationsQuery.isFetchingNextPage
                  ? "Завантаження…"
                  : "Показати ще"}
              </AppButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}
