"use client";
import React, { useState } from "react";
import css from "./ConfirmationModal.module.css";
import { AppButton } from "../../Button/Button";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

interface ConfirmationModalProps {
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}

const ConfirmationModal = ({
  title,
  confirmButtonText = "Вийти",
  cancelButtonText = "Відмінити",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (onCancel) onCancel();
    router.back();
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);

      if (onConfirm) {
        await onConfirm();
      }

      router.back();
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.headerWrapper}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>Ми будемо сумувати за вами!</p>
      </div>
      <div className={css.buttonsWrapper}>
        <AppButton
          variant="secondary"
          onClick={handleClose}
          className={css.btn}
        >
          {cancelButtonText}
        </AppButton>
        <AppButton onClick={handleConfirm} className={css.btn}>
          {isLoading ? "Завантаження..." : confirmButtonText}
        </AppButton>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
