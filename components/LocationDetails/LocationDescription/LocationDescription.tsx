import css from "./LocationDescription.module.css";

interface Props {
  description: string;
}

export const LocationDescription = ({ description }: Props) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>{description}</p>
    </div>
  );
};
