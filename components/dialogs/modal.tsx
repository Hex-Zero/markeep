import { useState, useEffect } from "react";
import * as React from "react";
import style from "../../styles/modal.module.scss";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export function Modal({ children, isOpen }: IModalProps) {
  const [modalOpen, setIsOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <div className={modalOpen ? style.showModal : style.hideModal}>
      <div
        onClick={() => setIsOpen(false)}
        className={style.modalOverlay}
      ></div>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
}
