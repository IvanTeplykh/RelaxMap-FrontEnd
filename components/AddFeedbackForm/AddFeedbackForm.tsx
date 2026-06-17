import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../components/locations/LocationForm/LocationForm.module.css";
import css from "./AddFeedbackForm.module.css";
import { AppButton, Loader } from "../ui";
import { StarRating } from "react-flexible-star-rating";
export interface ReviewFormValues {
  rating: number;
  review: string;
}

interface AddFeedbackFormProps {
  onSubmit: (values: ReviewFormValues) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const STARS_DIMENSION = 7.5;

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Оберіть оцінку")
    .max(5)
    .required("Оцінка є обов'язковою"),
  review: Yup.string()
    .min(1, "Відгук занадто короткий")
    .required("Напишіть ваш відгук"),
});

const AddFeedbackForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: AddFeedbackFormProps) => {
  return (
    <Formik
      initialValues={{ rating: 0, review: "" }}
      validationSchema={ReviewSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className={`${styles.form}`}>
          <div className={`${styles.fieldGroup} ${css.fieldGroup}`}>
            <div>
              <h2 className={css.subTitle}>Ваш відгук</h2>
              <Field
                as="textarea"
                name="review"
                disabled={isLoading}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Напишіть ваш відгук"
              />
              <ErrorMessage
                className={styles.inputError}
                name="review"
                component="span"
              />
            </div>
            <div>
              <StarRating
                initialRating={values.rating}
                starsLength={5}
                isHalfRatingEnabled={false}
                isReadOnly={isLoading}
                dimension={STARS_DIMENSION}
                color="#000000"
                onRatingChange={(rating: number) =>
                  setFieldValue("rating", rating)
                }
              />
            </div>
            <ErrorMessage
              className={styles.inputError}
              name="rating"
              component="span"
            />
          </div>

          <div className={`${styles.actions} ${css.actions}`}>
            <AppButton
              className={styles.actionButton}
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Відмінити
            </AppButton>
            <AppButton
              className={styles.actionButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader variant="white" /> : "Надіслати"}
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddFeedbackForm;
