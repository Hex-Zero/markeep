import { useState, useEffect } from "react";
import * as React from "react";
import style from "../../styles/modal.module.scss";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: IModalProps) {
  const [modalOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const handleModalClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div
      className={`${style.modalContainer} ${modalOpen ? style.showModal : ""} `}
    >
      <div onClick={handleModalClose} className={style.modalOverlay}></div>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
}
