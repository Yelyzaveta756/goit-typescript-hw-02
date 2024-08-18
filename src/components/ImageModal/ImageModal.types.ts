import { ModalData } from "../../App";

  export interface ImageModalProps {
    modalData: ModalData | null;
    isModalOpen: boolean;
    onModalClose: () => void;
  }