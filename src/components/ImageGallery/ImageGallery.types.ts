import { ImageResult } from "../../httpQuery";
import { ModalData } from "../../App";

export interface ImageGalleryProps {
  images: ImageResult[];
  onImageClick: (modalData: ModalData) => void;
}