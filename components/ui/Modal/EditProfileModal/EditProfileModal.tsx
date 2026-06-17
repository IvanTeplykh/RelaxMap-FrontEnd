"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import Modal from "../Modal";
import css from "./EditProfileModal.module.css";
import { updateCurrentUser } from "@/lib/usersApi";
import { useAuthStore } from "@/store";
import { User } from "@/types";
import { AppButton } from "@/components/ui/Button/Button";

interface EditProfileModalProps {
  user: User | null;
  userId: string;
  currentAvatarUrl: string;
  onClose: () => void;
}

const EditProfileModal = ({
  user,
  userId,
  currentAvatarUrl,
  onClose,
}: EditProfileModalProps) => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatarUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Виберіть зображення");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Розмір файлу не повинен перевищувати 5MB");
      return;
    }

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() && !avatarFile) {
      toast.error("Заповніть ім'я або виберіть фото");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      if (name.trim()) {
        formData.append("name", name.trim());
      }
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const updatedUser = await updateCurrentUser(formData);

      queryClient.invalidateQueries({ queryKey: ["profile", userId] });

      if (user) {
        setUser({ ...user, name: updatedUser.name });
      }

      toast.success("Профіль оновлено");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Помилка при оновленні профілю");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={css.container}>
        <div className={css.headerWrapper}>
          <h2 className={css.title}>Редагувати профіль</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className={css.form}
          aria-label="Форма редагування профілю"
        >
          <p className={css.labelAvatar}>Аватар</p>
          <div className={css.avatarSection}>
            <div className={css.avatarPreview}>
              <Image
                src={previewUrl}
                alt="Avatar preview"
                width={117}
                height={117}
                unoptimized
                loading="eager"
              />
            </div>
            <label className={css.fileLabel}>
              <span className={css.fileButtonText}>Завантажити фото</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={css.fileInput}
                disabled={isLoading}
              />
            </label>
          </div>
          <div className={css.nameSection}>
            <label htmlFor="name" className={css.label}>
              Ім`я
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть нове ім'я"
              className={css.input}
              disabled={isLoading}
              maxLength={50}
              aria-label="Ім'я користувача"
            />
          </div>

          <div className={css.buttonsWrapper}>
            <AppButton
              type="button"
              onClick={onClose}
              className={css.cancelButton}
              disabled={isLoading}
              aria-label="Відмінити редагування профілю"
            >
              Відмінити
            </AppButton>
            <AppButton
              type="submit"
              className={css.submitButton}
              disabled={isLoading}
              variant="secondary"
              aria-label="Зберегти зміни профілю"
            >
              {isLoading ? "Збереження..." : "Зберегти"}
            </AppButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
