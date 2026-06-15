"use client";
import ConfirmationModal from "@/components/ui/Modal/ConfirmationModal/ConfirmationModal";
import { useLogout } from "@/hooks/useLogout";

export default function ConfirmationPage() {
  const handleLogout = useLogout();
  return (
 <ConfirmationModal
      title="Ви точно хочете вийти?"
      confirmButtonText="Вийти"
      cancelButtonText="Відмінити"
      onConfirm={handleLogout}
    />
  );
}
