"use client";
import ConfirmationModal from "@/components/ui/Modal/ConfirmationModal/ConfirmationModal";
import { useLogout } from "@/hooks/useLogout";

export default function ConfirmationPage() {
  const handleLogout = useLogout();
  return (
    <ConfirmationModal
      title="Ви впевнені, що хочете вийти?"
      confirmButtonText="Так"
      cancelButtonText="Ні"
      onConfirm={handleLogout}
    />
  );
}
