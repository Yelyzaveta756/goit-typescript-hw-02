import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageGalleryProps } from "./ImageGallery.types";

export default function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <ul className={css.galleryList}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          imageSmallSrc={image.urls.small}
          imageFullSrc={image.urls.regular}
          altText={image.alt_description}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}
