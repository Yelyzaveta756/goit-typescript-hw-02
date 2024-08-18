import { ModalData } from "../../App";

export interface ImageCardProps {
  imageSmallSrc: string;
  imageFullSrc: string;
  altText?: string; 
  onImageClick: (modalData: ModalData) => void
}