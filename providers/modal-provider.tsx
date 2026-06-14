"use client";

import AddReviewModal from "@/components/ui/Modal/AddReviewModal/AddReviewModal";
import AuthPromptModal from "@/components/ui/Modal/AuthPromptModal/AuthPromptModal";
import ConfirmationModal from "@/components/ui/Modal/ConfirmationModal/ConfirmationModal";
import Modal from "@/components/ui/Modal/Modal";
import { useModal } from "@/hooks/use-modal-store";

export function ModalProvider() {
  const { type, isOpen, onClose } = useModal();
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {type === "AddReviewModal" && <AddReviewModal />}
      {type === "AuthPromptModal" && <AuthPromptModal />}
      {type === "ConfirmationModal" && <ConfirmationModal />}
    </Modal>
  );
}
