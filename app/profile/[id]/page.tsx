'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getUserLocations, getUserProfile } from '@/lib/usersApi';
import type { LocationsResponse } from '@/types/profile';
import { ProfileHeader } from '@/components/profile/ProfileHeader/ProfileHeader';
import { EmptyLocations } from '@/components/profile/EmptyLocations/EmptyLocations';
import { LocationCard } from '@/components/locations';
import { AppButton } from '@/components/ui';
import styles from './page.module.css';

const PER_PAGE = 6;

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const profileQuery = useQuery({
    queryKey: ['public-profile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: Boolean(userId),
  });

  const locationsQuery = useInfiniteQuery({
    queryKey: ['public-profile-locations', userId],
    queryFn: ({ pageParam }) => getUserLocations(userId, pageParam, PER_PAGE),
    enabled: Boolean(userId),
    initialPageParam: 1,
    getNextPageParam: (lastPage: LocationsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  if (!userId) {
    return null;
  }

  if (profileQuery.isLoading || locationsQuery.isLoading) {
    return <p className={styles.State}>Завантаження…</p>;
  }

  if (profileQuery.isError || locationsQuery.isError || !profileQuery.data) {
    return <p className={styles.State}>Не вдалося завантажити профіль.</p>;
  }

  const profile = profileQuery.data;
  const pages = locationsQuery.data?.pages ?? [];
  const totalLocations = pages[0]?.totalLocations ?? 0;
  const locations = pages.flatMap((page) => page.locations);

  return (
    <div className={styles.Wrapper}>
      <ProfileHeader
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        articlesAmount={profile.articlesAmount}
      />

      <h2 className={styles.SectionTitle}>Локації</h2>

      {totalLocations === 0 ? (
        <EmptyLocations
          text="Цей користувач ще не ділився локаціями"
          buttonLabel="Назад до локацій"
          buttonHref="/locations"
        />
      ) : (
        <>
          <ul className={styles.Grid}>
            {locations.map((location) => (
              <li key={location._id}>
                <LocationCard location={location} />
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
                  ? 'Завантаження…'
                  : 'Показати ще'}
              </AppButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}
