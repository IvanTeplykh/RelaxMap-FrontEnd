"use client";
import React from "react";
import css from "./AuthPromptModal.module.css";
import { useModal } from "@/hooks/use-modal-store";
import { AppLink } from "../../Button/Button";

const AuthPromptModal = () => {
  const onClose = useModal().onClose;

  return (
    <div className={css.wrapper}>
      <div className={css.headerWrapper}>
        <h3 className={css.title}>Помилка під час додавання відгуку</h3>
        <p className={css.description}>
          Щоб залишити відгук вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>
      </div>
      <div className={css.buttonsWrapper}>
        <div className={css.linkWrapper} onClick={onClose}>
          <AppLink href="/login" variant="secondary" className={css.btn}>
            Увійти
          </AppLink>
        </div>
        <div className={css.linkWrapper} onClick={onClose}>
          <AppLink href="/register" variant="primary" className={css.btn}>
            Зареєструватись
          </AppLink>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
