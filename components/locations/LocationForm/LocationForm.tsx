"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  createLocation,
  getLocationTypes,
  getRegions,
  type LocationCategoryOption,
} from "@/lib/locationsApi";
import { AppButton, Loader } from "@/components/ui";
import { classNames } from "@/lib/utils";
import LocationInputWithMap from "@/components/Map/LocationInputWithMapComponent";
import styles from "./LocationForm.module.css";

export type LocationFormValues = {
  name: string;
  locationType: string;
  region: string;
  description: string;
  image: File | null;
  address?: string;
  coordinates?: {
    lat: number;
    lon: number;
  } | null;
};

const MAX_IMAGE_SIZE = 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const emptyLocationFormValues: LocationFormValues = {
  name: "",
  locationType: "",
  region: "",
  description: "",
  image: null,
  address: "",
  coordinates: null,
};

type LocationFormMode = "create" | "edit";

type BaseLocationFormProps = {
  mode?: LocationFormMode;
  initialValues?: Partial<Omit<LocationFormValues, "image">> & {
    image?: File | null;
  };
  initialImageUrl?: string | null;
  onCancel?: () => void;
};

type CreateLocationFormProps = BaseLocationFormProps & {
  mode?: "create";
  onSubmit?: never;
};

type EditLocationFormProps = BaseLocationFormProps & {
  mode: "edit";
  onSubmit: (values: LocationFormValues) => Promise<void> | void;
};

export type LocationFormProps = CreateLocationFormProps | EditLocationFormProps;

export function LocationForm({
  mode = "create",
  initialValues: providedInitialValues,
  initialImageUrl = null,
  onSubmit,
  onCancel,
}: LocationFormProps = {}) {
  const router = useRouter();
  const [locationTypes, setLocationTypes] = useState<LocationCategoryOption[]>(
    [],
  );
  const [regions, setRegions] = useState<LocationCategoryOption[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [selectedImagePreviewUrl, setSelectedImagePreviewUrl] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  const isEditMode = mode === "edit";

  const formInitialValues = useMemo<LocationFormValues>(
    () => ({
      ...emptyLocationFormValues,
      ...providedInitialValues,
      image: providedInitialValues?.image ?? null,
    }),
    [providedInitialValues],
  );

  const locationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .trim()
          .min(3, "Назва має містити щонайменше 3 символи")
          .max(96, "Назва має містити не більше 96 символів")
          .required("Вкажіть назву місця"),
        locationType: Yup.string()
          .max(64, "Тип місця має містити не більше 64 символів")
          .oneOf(
            locationTypes.map((type) => type.value),
            "Оберіть тип місця зі списку",
          )
          .required("Оберіть тип місця"),
        region: Yup.string()
          .max(64, "Регіон має містити не більше 64 символів")
          .oneOf(
            regions.map((region) => region.value),
            "Оберіть регіон зі списку",
          )
          .required("Оберіть регіон"),
        address: Yup.string().trim().required("Вкажіть адресу місця"),
        coordinates: Yup.object()
          .shape({
            lat: Yup.number().required(),
            lon: Yup.number().required(),
          })
          .nullable()
          .required("Оберіть місце на карті або знайдіть його за адресою"),
        description: Yup.string()
          .trim()
          .min(20, "Опис має містити щонайменше 20 символів")
          .max(6000, "Опис має містити не більше 6000 символів")
          .required("Додайте детальний опис"),
        image: Yup.mixed<File>()
          .nullable()
          .test("imageRequired", "Додайте фото локації", (file) =>
            isEditMode && initialImageUrl ? true : file instanceof File,
          )
          .test(
            "fileType",
            "Підтримуються лише JPG або PNG зображення",
            (file) => (file ? SUPPORTED_IMAGE_TYPES.includes(file.type) : true),
          )
          .test("fileSize", "Розмір зображення має бути менше 1 МБ", (file) =>
            file ? file.size < MAX_IMAGE_SIZE : true,
          ),
      }),
    [initialImageUrl, isEditMode, locationTypes, regions],
  );

  const formik = useFormik<LocationFormValues>({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: locationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        const { address, ...submitValues } = values;

        if (isEditMode) {
          await onSubmit?.(submitValues);
          toast.success("Зміни успішно збережено");
          return;
        }

        if (!values.image) {
          throw new Error("Додайте фото локації");
        }

        const createdLocation = await createLocation({
          ...submitValues,
          image: values.image,
        });
        toast.success("Локацію успішно опубліковано");
        router.push(`/locations/${createdLocation._id}`);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : isEditMode
              ? "Не вдалося зберегти зміни. Спробуйте ще раз."
              : "Не вдалося опублікувати локацію. Спробуйте ще раз.",
        );
      }
    },
  });

  const { validateForm } = formik;

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      setIsCategoriesLoading(true);
      setCategoriesError(null);

      try {
        const [types, regionOptions] = await Promise.all([
          getLocationTypes(),
          getRegions(),
        ]);

        if (!isMounted) return;

        setLocationTypes(
          types.map((type) => ({ label: type.type, value: type.slug })),
        );
        setRegions(
          regionOptions.map((region) => ({
            label: region.region ?? region.name ?? region.type ?? region.slug,
            value: region.slug,
          })),
        );
      } catch (error) {
        if (!isMounted) return;

        const message =
          error instanceof Error
            ? error.message
            : "Не вдалося завантажити списки типів місць і регіонів.";

        setCategoriesError(message);
        toast.error(message);
      } finally {
        if (isMounted) setIsCategoriesLoading(false);
      }
    }

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isCategoriesLoading && !categoriesError) {
      void validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesError, isCategoriesLoading]);

  useEffect(() => {
    return () => {
      if (selectedImagePreviewUrl) URL.revokeObjectURL(selectedImagePreviewUrl);
    };
  }, [selectedImagePreviewUrl]);

  const isSubmitDisabled = useMemo(
    () =>
      !formik.dirty ||
      !formik.isValid ||
      formik.isSubmitting ||
      isCategoriesLoading ||
      categoriesError !== null,
    [
      categoriesError,
      formik.dirty,
      formik.isSubmitting,
      formik.isValid,
      isCategoriesLoading,
    ],
  );

  const getError = (field: keyof LocationFormValues) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

  const resizeDescriptionTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 400 ? "auto" : "hidden";
  };

  useEffect(() => {
    if (descriptionTextareaRef.current) {
      resizeDescriptionTextarea(descriptionTextareaRef.current);
    }
  }, [formik.values.description]);

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    formik.handleChange(event);
    resizeDescriptionTextarea(event.currentTarget);
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;

    if (selectedImagePreviewUrl) URL.revokeObjectURL(selectedImagePreviewUrl);

    setSelectedImagePreviewUrl(file ? URL.createObjectURL(file) : null);
    await formik.setFieldValue("image", file, true);
    await formik.setFieldTouched("image", true, true);
  };

  const handleCancel = () => {
    formik.resetForm();
    if (selectedImagePreviewUrl) URL.revokeObjectURL(selectedImagePreviewUrl);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedImagePreviewUrl(null);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={formik.handleSubmit}
      noValidate
      aria-busy={isCategoriesLoading || formik.isSubmitting}
    >
      {isCategoriesLoading && <Loader overlay size="lg" />}
      <div className={styles.fieldGroup}>
        <p className={styles.label} id="location-image-label">
          Обкладинка
        </p>
        <div className={styles.imagePreview}>
          <Image
            src={
              selectedImagePreviewUrl ?? initialImageUrl ?? "/placeholder.jpg"
            }
            alt={
              selectedImagePreviewUrl
                ? "Попередній перегляд фото локації"
                : initialImageUrl
                  ? "Поточне фото локації"
                  : "Плейсхолдер фото локації"
            }
            fill
            sizes="(max-width: 767px) 335px, (max-width: 1439px) 704px, 1091px"
            className={styles.previewImage}
            priority={!selectedImagePreviewUrl && !initialImageUrl}
            unoptimized={Boolean(selectedImagePreviewUrl || initialImageUrl)}
          />
        </div>
        <input
          id="location-image"
          name="image"
          type="file"
          accept="image/jpeg,image/png"
          className={styles.fileInput}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <label
          className={styles.uploadButton}
          htmlFor="location-image"
          id="location-image-upload-label"
        >
          Завантажити фото
        </label>
        {getError("image") && (
          <p className={styles.error}>{getError("image") as string}</p>
        )}
      </div>

      <div className={styles.fieldsGrid}>
        {categoriesError && (
          <p className={styles.statusMessage} role="status">
            Не вдалося завантажити типи місць і регіони. Оновіть сторінку.
          </p>
        )}

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="location-name">
            Назва місця
          </label>
          <input
            id="location-name"
            type="text"
            placeholder="Введіть назву місця"
            className={classNames(
              styles.input,
              getError("name") && styles.inputError,
            )}
            {...formik.getFieldProps("name")}
          />
          {getError("name") && (
            <p className={styles.error}>{getError("name")}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="location-type">
            Тип місця
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="location-type"
              className={classNames(
                styles.input,
                !formik.values.locationType && styles.placeholderSelect,
                getError("locationType") && styles.selectError,
              )}
              disabled={isCategoriesLoading || categoriesError !== null}
              {...formik.getFieldProps("locationType")}
            >
              <option value="" disabled hidden>
                {isCategoriesLoading
                  ? "Завантажуємо типи..."
                  : "Оберіть тип місця"}
              </option>
              {locationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <svg className={styles.selectArrow} aria-hidden="true">
              <use href="/sprite.svg#arrow-down" />
            </svg>
          </div>
          {getError("locationType") && (
            <p className={styles.error}>{getError("locationType")}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="location-region">
            Регіон
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="location-region"
              className={classNames(
                styles.input,
                !formik.values.region && styles.placeholderSelect,
                getError("region") && styles.selectError,
              )}
              disabled={isCategoriesLoading || categoriesError !== null}
              {...formik.getFieldProps("region")}
            >
              <option value="" disabled hidden>
                {isCategoriesLoading
                  ? "Завантажуємо регіони..."
                  : "Оберіть регіон"}
              </option>
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
            <svg className={styles.selectArrow} aria-hidden="true">
              <use href="/sprite.svg#arrow-down" />
            </svg>
          </div>
          {getError("region") && (
            <p className={styles.error}>{getError("region")}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Адреса та розташування на карті
          </label>
          <LocationInputWithMap
            location={formik.values.address || ""}
            setLocation={(value) => {
              if (formik.values.address !== value) {
                formik.setFieldValue("address", value);
              }
            }}
            onCoordinatesChange={(coords) => {
              const newLat = coords?.lat ?? null;
              const newLon = coords?.lon ?? null;
              const currentCoordinates = formik.values.coordinates;
              const currentLat = currentCoordinates?.lat ?? null;
              const currentLon = currentCoordinates?.lon ?? null;
              if (
                currentLat !== newLat ||
                currentLon !== newLon
              ) {
                formik.setFieldValue(
                  "coordinates",
                  coords ? { lat: newLat, lon: newLon } : null,
                );
              }
            }}
            initialCoordinates={formik.initialValues.coordinates}
          />
          {getError("coordinates") && (
            <p className={styles.error}>{getError("coordinates") as string}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="location-description">
            Детальний опис
          </label>
          <textarea
            id="location-description"
            placeholder="Детальний опис локації"
            className={classNames(
              styles.input,
              styles.textarea,
              getError("description") && styles.inputError,
            )}
            {...formik.getFieldProps("description")}
            ref={descriptionTextareaRef}
            onChange={handleDescriptionChange}
          />
          {getError("description") && (
            <p className={styles.error}>{getError("description")}</p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <AppButton
          className={styles.actionButton}
          type="submit"
          disabled={isSubmitDisabled}
        >
          {formik.isSubmitting ? (
            <span className={styles.buttonLoaderContent}>
              <Loader size="sm" variant="white" />
              {isEditMode ? "Зберігаємо..." : "Публікуємо..."}
            </span>
          ) : isEditMode ? (
            "Зберегти зміни"
          ) : (
            "Опублікувати"
          )}
        </AppButton>
        <AppButton
          className={styles.actionButton}
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={formik.isSubmitting}
        >
          {isEditMode ? "Відмінити зміни" : "Відмінити"}
        </AppButton>
      </div>
    </form>
  );
}
