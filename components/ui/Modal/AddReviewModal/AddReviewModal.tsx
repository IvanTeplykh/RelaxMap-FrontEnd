"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal";
import css from "./AddReviewModal.module.css";
import AddFeedbackForm, {
  ReviewFormValues,
} from "@/components/AddFeedbackForm/AddFeedbackForm";
import toast from "react-hot-toast";
import { addFeedback } from "@/lib/feedbacks";

const AddReviewModal = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const locationId = params.locationId as string;

  const handleConfirm = async (values: ReviewFormValues) => {
    try {
      setIsLoading(true);

      await addFeedback({
        locationId: locationId,
        rate: values.rating,
        description: values.review,
      });

      toast.success("Ваш відгук відправлено на модерацію");

      queryClient.invalidateQueries({ queryKey: ["feedbacks", locationId] });

      router.back();
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      console.error("Action failed:", error);
      toast.error(
        "Виникла помилка під час відправлення відгуку. Спробуйте ще раз.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleCancel}>
      <div className={css.headerWrapper}>
        <h2 className={css.title}>Залишити відгук</h2>
      </div>
      <AddFeedbackForm
        onSubmit={handleConfirm}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default AddReviewModal;
