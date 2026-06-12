import Image from "next/image";
import css from "./Profile.module.css";
import { User } from "@/types";
import { useModal } from "@/hooks/use-modal-store";

interface ProfileProps {
  user: User | null;
}

export default function Profile({ user }: ProfileProps) {
  const { onOpen } = useModal();

  const handleModalLogout = () => {
    onOpen("ConfirmationModal");
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
      <p className={css.profileName}>{user?.name || "Імʼя"}</p>
      <span className={css.profileBorder}></span>
      <button className={css.profileLogoutButton} onClick={handleModalLogout}>
        <svg className={css.profileLogoutIcon}>
          <use className={css.profileIcon} href="/sprite.svg#logout" />
        </svg>
      </button>
    </div>
  );
}
