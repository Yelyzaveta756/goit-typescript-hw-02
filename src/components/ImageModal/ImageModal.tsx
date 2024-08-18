import ReactModal from "react-modal";
import { ImageModalProps } from "./ImageModal.types";

ReactModal.setAppElement('#root');

export default function ImageModal({ modalData, isModalOpen, onModalClose }: ImageModalProps) {
  if (!modalData) return null;

  const { imageFullSrc, altText } = modalData;

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onModalClose}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90%',
          maxWidth: '90%',
          overflow: 'auto'
        }
      }}
    >
      <img src={imageFullSrc} alt={altText} style={{ width: '100%', height: 'auto' }} />
      <div>
        <p style={{
            color: 'black',
            background: 'rgb(172, 172, 233)',
            padding: '5px',
            textAlign: 'center'
        }}>{altText}</p>
      </div>
    </ReactModal>
  );
}
