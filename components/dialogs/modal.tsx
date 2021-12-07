import { useState, useEffect } from "react";
import * as React from "react";
import style from "../../styles/modal.module.scss";

export interface IModalProps {
  children: React.ReactNode;
  isOpen: string;
}

export function Modal({ children, isOpen }: IModalProps) {
  const [modalOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen === "open") setIsOpen(true);
    console.log(isOpen);

    if (isOpen === "close") setIsOpen(false);
  }, [isOpen]);

  return (
    <div
      className={`${style.modalContainer} ${
        modalOpen ? style.showModal : style.hideModal
      }`}
    >
      <div
        onClick={() => setIsOpen(false)}
        className={style.modalOverlay}
      ></div>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
}
