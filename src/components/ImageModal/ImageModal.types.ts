import { ModalData } from "../../App";

  export interface ImageModalProps {
    modalData: ModalData;
    isModalOpen: boolean;
    onModalClose: () => void;
  }