"use client";
import React from "react";
import css from "./ConfirmationModal.module.css";
import { useModal } from "@/hooks/use-modal-store";
import { AppButton } from "../../Button/Button";

const ConfirmationModal = () => {
  const onClose = useModal().onClose;
  const handleLogout = () => {
    //! user logout
    console.log("Logout");

    onClose();
  };
  return (
    <>
      <div className={css.headerWrapper}>
        <h3 className={css.title}>Ви точно хочете вийти?</h3>
        <p className={css.description}>Ми будемо сумувати за вами!</p>
      </div>
      <div className={css.buttonsWrapper}>
        <AppButton variant="secondary" onClick={onClose} className={css.btn}>
          Відмінити
        </AppButton>
        <AppButton onClick={handleLogout} className={css.btn}>
          Вийти
        </AppButton>
      </div>
    </>
  );
};

export default ConfirmationModal;
