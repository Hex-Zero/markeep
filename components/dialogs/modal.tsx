import * as React from "react";
import style from "../../styles/modal.module.scss";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  modalContainerClass?: string;
  maxWidth?: string;
  onClose: () => void;
}

export function Modal({
  children,
  isOpen,
  modalContainerClass,
  maxWidth,
  onClose,
}: IModalProps) {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <div
      className={`${style.modalContainer} ${isOpen ? style.showModal : ""} `}
    >
      <div onClick={handleModalClose} className={style.modalOverlay}></div>
      <div
        style={{ maxWidth: maxWidth }}
        className={`${modalContainerClass} ${style.modalContent}`}
      >
        {children}
      </div>
    </div>
  );
}
