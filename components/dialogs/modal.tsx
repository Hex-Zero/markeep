import * as React from "react";
import style from "../../styles/modal.module.scss";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  modalContainerClass?: string;
  onClose: () => void;
}

export function Modal({
  children,
  isOpen,
  modalContainerClass,
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
      <div className={`${modalContainerClass} ${style.modalContent}`}>
        {children}
      </div>
    </div>
  );
}
