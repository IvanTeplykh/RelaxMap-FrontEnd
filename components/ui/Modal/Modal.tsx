"use client";

import React, { useEffect, useCallback } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useModal } from "@/hooks/use-modal-store";

/*
Для виклику модалки у вашому компоненті вам потрібно з хука useModal
дістати функцію onOpen:

  const { onOpen } = useModal();

І при кліку на кнопку викликати цю функцію передавши в неї назву вашої модалки

  const handleBtnClick = () => {
    onOpen("ConfirmationModal");
  };

  Ось всі назви модалок
    <Modal isOpen={isOpen} onClose={onClose}>
      {type === "AddReviewModal" && <AddReviewModal />}
      {type === "AuthPromptModal" && <AuthPromptModal />}
      {type === "ConfirmationModal" && <ConfirmationModal />}
    </Modal>

  Також можна викликати функцію onClose:

  сonst { onClose } = useModal().onClose;


  Коли ви викликаєте вашу модалку вам потрібно заповнити її вмістом
    В файлі modal-providers знаходяться рендер всіх модалок
    Вам лишається лише заповнити вміст в компоненті вашої модалки

    Для прикладу можете дивитись на модалку ConfirmationModal <ConfirmationModal />
*/

interface BaseModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = ({
  children,
  isOpen: explicitIsOpen,
  onClose: explicitOnClose,
}: BaseModalProps) => {
  const storeModal = useModal();

  const isOpen =
    explicitIsOpen !== undefined ? explicitIsOpen : storeModal.isOpen;
  const onClose =
    explicitOnClose !== undefined ? explicitOnClose : storeModal.onClose;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <button
            onClick={onClose}
            className={css.closeButton}
            aria-label="Close"
          >
            <svg className={css.xIcon} width="24" height="24">
              <use href="/sprite.svg#close"></use>
            </svg>
          </button>
        </div>

        <div className={css.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
