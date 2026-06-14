import Image from "next/image";
import css from "./LocationGallery.module.css";

interface Props {
  image: string;
  name: string;
}

export const LocationGallery = ({ image, name }: Props) => {
  return (
    <div className={css.galleryWrapper}>
      <Image
        src={image}
        alt={name}
        fill
        className={css.galleryImage}
        priority
        sizes="100vw"
      />
    </div>
  );
};
