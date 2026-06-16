"use client";

import Image from "next/image";
import css from "./Profile.module.css";
import { User } from "@/types";
import formatUserName from "@/utils/getShortUsernameHeader";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/usersApi";
import { useState } from "react";
import EditProfileModal from "@/components/ui/Modal/EditProfileModal/EditProfileModal";

interface ProfileProps {
  user: User | null;
  onNavigate?: () => void;
}

export default function Profile({ user, onNavigate }: ProfileProps) {
  const router = useRouter();
  const userId = user?.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId as string),
    enabled: Boolean(userId),
  });
  const profile = profileQuery.data;

  const handleModalLogout = () => {
    router.push("/confirmation");
  };

  if (profileQuery.isLoading) {
    return <p className={css.State}>Завантаження…</p>;
  }

  if (profileQuery.isError || !profile) {
    return <p className={css.State}>Не вдалося завантажити профіль.</p>;
  }
  console.log("Profile data:", profile);
  console.log("avatarUrl:", profile.avatarUrl);

  return (
    <div className={css.profileWrapper}>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className={css.editButton}
      >
        <Image
          className={css.profileImage}
          src={profile.avatarUrl}
          alt="Profile image"
          width={32}
          height={32}
          unoptimized
          loading="eager"
        />
        <span className={css.profileName}>{formatUserName(user?.name)}</span>
      </button>
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          userId={userId!}
          currentAvatarUrl={profile.avatarUrl}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      <span className={css.profileBorder}></span>
      <button
        className={css.profileLogoutButton}
        onClick={() => {
          handleModalLogout();
          onNavigate?.();
        }}
        type="button"
        aria-label="Вийти з профілю"
      >
        <svg className={css.profileLogoutIcon} aria-hidden="true">
          <use className={css.profileIcon} href="/sprite.svg#logout" />
        </svg>
      </button>
    </div>
  );
}
