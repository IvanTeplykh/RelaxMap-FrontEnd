import { ChangeEvent, useEffect, useRef, useState } from "react";
import css from "./FilterPanel.module.css";
interface Region {
  _id: string;
  region?: string;
  name?: string;
  type?: string;
  slug: string;
}
interface LocationType {
  _id: string;
  type: string;
  slug: string;
  shortDescription?: string;
}
interface FilterPanelProps {
  search: string;
  region: string;
  sort: string;
  regions: Region[];
  locationTypes: LocationType[];
  locationTypesFilter: string[];
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRegionChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onLocationTypeChange: (slug: string) => void;
}
export const FilterPanel = ({
  search,
  region,
  sort,
  regions,
  locationTypes,
  locationTypesFilter,
  onSearchChange,
  onRegionChange,
  onLocationTypeChange,
  onSortChange,
}: FilterPanelProps) => {
  const [isLocationTypesOpen, setIsLocationTypesOpen] = useState(false);
  const locationTypesRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDetailsElement>(null);
  const sortRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationTypesRef.current &&
        !locationTypesRef.current.contains(event.target as Node)
      ) {
        setIsLocationTypesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (regionRef.current && !regionRef.current.contains(target)) {
        regionRef.current.removeAttribute("open");
      }

      if (sortRef.current && !sortRef.current.contains(target)) {
        sortRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.filters}>
      <input
        className={css.input}
        type="text"
        placeholder="Пошук"
        value={search}
        onChange={onSearchChange}
      />
      <details
        className={`${css.dropdown} ${css.regionDropdown}`}
        ref={regionRef}
      >
        <summary className={css.dropdownSummary}>
          <span>
            {region
              ? regions.find((regionItem) => regionItem.slug === region)
                  ?.region ||
                regions.find((regionItem) => regionItem.slug === region)
                  ?.name ||
                regions.find((regionItem) => regionItem.slug === region)
                  ?.type ||
                region
              : "Регіон"}
          </span>
          <svg className={css.dropdownArrow} aria-hidden="true">
            <use href="/sprite.svg#arrow-down" />
          </svg>
        </summary>
        <div className={css.dropdownContent}>
          <ul className={css.dropdownList}>
            <li className={css.dropdownItem}>
              <label className={css.dropdownOption}>
                <input
                  className={css.dropdownInput}
                  type="radio"
                  name="region"
                  value=""
                  checked={region === ""}
                  onChange={(event) => {
                    onRegionChange(event.target.value);
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open");
                  }}
                />
                <span className={css.dropdownText}>Усі регіони</span>
              </label>
            </li>
            {regions.map((regionItem) => {
              const label =
                regionItem.region ||
                regionItem.name ||
                regionItem.type ||
                regionItem.slug;
              return (
                <li key={regionItem._id} className={css.dropdownItem}>
                  <label className={css.dropdownOption}>
                    <input
                      className={css.dropdownInput}
                      type="radio"
                      name="region"
                      value={regionItem.slug}
                      checked={region === regionItem.slug}
                      onChange={(event) => {
                        onRegionChange(event.target.value);
                        event.currentTarget
                          .closest("details")
                          ?.removeAttribute("open");
                      }}
                    />
                    <span className={css.dropdownText}>{label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </details>
      <div className={css.locationTypes} ref={locationTypesRef}>
        <button
          className={css.locationTypesButton}
          type="button"
          onClick={() => setIsLocationTypesOpen((prev) => !prev)}
          aria-expanded={isLocationTypesOpen}
        >
          <span>
            {locationTypesFilter.length > 0
              ? `Обрано: ${locationTypesFilter.length}`
              : "Тип локації"}
          </span>
          <svg
            className={`${css.locationTypesArrow} ${
              isLocationTypesOpen ? css.locationTypesArrowOpen : ""
            }`}
            aria-hidden="true"
          >
            <use href="/sprite.svg#arrow-down" />
          </svg>
        </button>
        {isLocationTypesOpen && (
          <div className={css.locationTypesDropdown}>
            {locationTypes.map((typeItem) => (
              <label key={typeItem._id} className={css.locationTypeOption}>
                <input
                  className={css.locationTypeCheckbox}
                  type="checkbox"
                  value={typeItem.slug}
                  checked={locationTypesFilter.includes(typeItem.slug)}
                  onChange={() => onLocationTypeChange(typeItem.slug)}
                />

                <span className={css.customCheckbox}>
                  <svg className={css.checkboxIcon} aria-hidden="true">
                    <use href="/sprite.svg#check_box" />
                  </svg>
                </span>

                <span>{typeItem.type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <details className={`${css.dropdown} ${css.sortDropdown}`} ref={sortRef}>
        <summary className={css.dropdownSummary}>
          <span>
            {sort === "rating"
              ? "За рейтингом"
              : sort === "newest"
                ? "Новіші спочатку"
                : "За популярністю"}
          </span>
          <svg className={css.dropdownArrow} aria-hidden="true">
            <use href="/sprite.svg#arrow-down" />
          </svg>
        </summary>
        <div className={css.dropdownContent}>
          <ul className={css.dropdownList}>
            <li className={css.dropdownItem}>
              <label className={css.dropdownOption}>
                <input
                  className={css.dropdownInput}
                  type="radio"
                  name="sort"
                  value=""
                  checked={sort === ""}
                  onChange={(event) => {
                    onSortChange(event.target.value);
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open");
                  }}
                />
                <span className={css.dropdownText}>За популярністю</span>
              </label>
            </li>
            <li className={css.dropdownItem}>
              <label className={css.dropdownOption}>
                <input
                  className={css.dropdownInput}
                  type="radio"
                  name="sort"
                  value="rating"
                  checked={sort === "rating"}
                  onChange={(event) => {
                    onSortChange(event.target.value);
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open");
                  }}
                />
                <span className={css.dropdownText}>За рейтингом</span>
              </label>
            </li>
            <li className={css.dropdownItem}>
              <label className={css.dropdownOption}>
                <input
                  className={css.dropdownInput}
                  type="radio"
                  name="sort"
                  value="newest"
                  checked={sort === "newest"}
                  onChange={(event) => {
                    onSortChange(event.target.value);
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open");
                  }}
                />
                <span className={css.dropdownText}>Новіші спочатку</span>
              </label>
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
};
