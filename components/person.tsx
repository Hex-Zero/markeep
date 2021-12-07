import { useState } from "react";
import * as React from "react";
import { getPersonData, setPersonDate } from "../hooks/usePersonData";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "./dialogs/modal";
import style from "../styles/person.module.scss";

export interface IPersonProps {
  nickname: string;
  fistName: string;
  lastName: string;
  id: string;
  onRefetch: () => void;
}

export default function Person({
  nickname,
  fistName,
  lastName,
  id,
  onRefetch,
}: IPersonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeletePerson = () => {
    try {
      setPersonDate(
        getPersonData().filter((person: IPerson) => person.id !== id)
      );
      onRefetch();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className={style.personCard} onClick={() => setModalOpen(true)}>
        <h1>{nickname}</h1>
        <p>
          {fistName} {lastName}
        </p>
        <div onClick={handleDeletePerson}>delete</div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h1>{nickname}</h1>
        <p>
          {fistName} {lastName}
        </p>
        <div onClick={handleDeletePerson}>delete</div>
      </Modal>
    </div>
  );
}
