"use client";

import Image from "next/image";
import css from "./Profile.module.css";
import { User } from "@/types";
import formatUserName from "@/utils/getShortUsernameHeader";
import { useRouter } from "next/navigation";

interface ProfileProps {
  user: User | null;
  onNavigate?: () => void;
}

export default function Profile({ user, onNavigate }: ProfileProps) {
  const router = useRouter();

  const handleModalLogout = () => {
    router.push("/confirmation");
  };

  return (
    <div className={css.profileWrapper}>
      <Image
        className={css.profileImage}
        src=""
        alt="Profile"
        width={32}
        height={32}
      />
      <p className={css.profileName}>{formatUserName(user?.name)}</p>
      <span className={css.profileBorder}></span>
      <button
        className={css.profileLogoutButton}
        onClick={() => {
          handleModalLogout();
          onNavigate?.();
        }}
      >
        <svg className={css.profileLogoutIcon}>
          <use className={css.profileIcon} href="/sprite.svg#logout" />
        </svg>
      </button>
    </div>
  );
}
