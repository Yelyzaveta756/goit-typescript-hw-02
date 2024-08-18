import css from "./ImageCard.module.css";
import { ImageCardProps } from "./ImageCard.types";

export const ImageCard = ({ imageSmallSrc, imageFullSrc, altText, onImageClick }: ImageCardProps) => {
  return (
    <li>
      <div className={css.imageCardContainer}>
        <img
          className={css.imageCard}
          src={imageSmallSrc}
          alt={altText || 'Image'}
          onClick={() => onImageClick({ imageFullSrc, altText })}
        />
      </div>
    </li>
  );
};
