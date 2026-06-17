"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getLocations, getLocationTypes, getRegions } from "@/lib/locationsApi";
import { FilterPanel } from "../FilterPanel/FilterPanel";
import { LocationsGrid } from "../LocationsGrid/LocationsGrid";
import css from "./LocationsPage.module.css";
import { useMediaQuery } from "react-responsive";
import { Loader, AppButton } from "@/components/ui";

export const LocationsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [region, setRegion] = useState(searchParams.get("region") || "");
  const [locationTypesFilter, setLocationTypesFilter] = useState<string[]>(
    () => searchParams.get("locationType")?.split(",").filter(Boolean) || [],
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const locationTypesQuery = locationTypesFilter.join(",");
  const [debouncedSearch] = useDebounce(search, 500);
  const listRef = useRef<HTMLUListElement>(null);
  const previousLocationsCountRef = useRef(0);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1440px)",
  });

  const perPage = isDesktop ? 9 : 6;

  useEffect(() => {
    const params = new URLSearchParams();
    const trimmedSearch = debouncedSearch.trim();
    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    }
    if (region) {
      params.set("region", region);
    }
    if (locationTypesQuery) {
      params.set("locationType", locationTypesQuery);
    }
    if (sort) {
      params.set("sort", sort);
    }
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [debouncedSearch, region, locationTypesQuery, sort, pathname, router]);
  const { data: regions = [] } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
  const { data: locationTypes = [] } = useQuery({
    queryKey: ["locationTypes"],
    queryFn: getLocationTypes,
  });
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "locations",
      debouncedSearch,
      region,
      locationTypesQuery,
      sort,
      perPage,
    ],
    queryFn: ({ pageParam }) =>
      getLocations({
        page: pageParam,
        limit: perPage,
        search: debouncedSearch.trim(),
        region,
        locationType: locationTypesQuery,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage.page);
      const totalPages = Number(lastPage.totalPages);
      if (currentPage >= totalPages) {
        return undefined;
      }
      return currentPage + 1;
    },
  });
  const locations = data?.pages.flatMap((page) => page.locations) ?? [];
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocationTypeChange = (slug: string) => {
    setLocationTypesFilter((currentTypes) => {
      if (currentTypes.includes(slug)) {
        return currentTypes.filter((type) => type !== slug);
      }
      return [...currentTypes, slug];
    });
  };
  const handleLoadMore = async () => {
    previousLocationsCountRef.current = locations.length;
    await fetchNextPage();
    requestAnimationFrame(() => {
      const locationCards = listRef.current?.querySelectorAll("li");
      const firstNewCard = locationCards?.[previousLocationsCountRef.current];
      firstNewCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  const locationTypeLabels = Object.fromEntries(
    locationTypes.map((item) => [item.slug, item.type]),
  );
  return (
    <>
      <h1 className={css.title}> Усі місця відпочинку </h1>
      <FilterPanel
        search={search}
        region={region}
        sort={sort}
        regions={regions}
        locationTypes={locationTypes}
        locationTypesFilter={locationTypesFilter}
        onSearchChange={handleSearchChange}
        onLocationTypeChange={handleLocationTypeChange}
        onRegionChange={setRegion}
        onSortChange={setSort}
      />
      <div className={css.contentArea}>
        {isLoading && (
          <div className={css.loaderWrapper}>
            <Loader size="lg" />
          </div>
        )}

        {isError && (
          <p className={css.statusMessage}> Не вдалося завантажити локації </p>
        )}

        {!isLoading && !isError && locations.length === 0 && (
          <div className={css.emptyState}>
            <div className={css.emptyStateIcon}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className={css.emptyStateTitle}>Нічого не знайдено</h3>
            <p className={css.emptyStateDescription}>
              Ми не знайшли локацій за вашим запитом. Спробуйте змінити фільтри пошуку або скиньте їх, щоб побачити всі місця.
            </p>
            <AppButton
              variant="primary"
              className={css.emptyStateButton}
              onClick={() => {
                setSearch("");
                setRegion("");
                setLocationTypesFilter([]);
                setSort("");
              }}
            >
              Скинути фільтри
            </AppButton>
          </div>
        )}
        {!isLoading && !isError && locations.length > 0 && (
          <LocationsGrid
            locations={locations}
            locationTypeLabels={locationTypeLabels}
            listRef={listRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>
    </>
  );
};
