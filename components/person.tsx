import { useState } from "react";
import * as React from "react";
import { getPersonData, setPersonDate } from "../hooks/usePersonData";
import { ICustomInput, IPerson } from "../interfaces/IPerson";
import { Modal } from "./dialogs/modal";
import style from "../styles/person.module.scss";
import { TextArea, handleAddTextArea } from "./inputs/textArea";
import { UserTimesSolidSVG } from "../assets/userTimesSolidSVG";

export interface IPersonProps {
  person: IPerson;
  id: string;
  onRefresh: () => void;
}

export default function Person({ person, id, onRefresh }: IPersonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeletePerson = () => {
    try {
      setPersonDate(
        getPersonData().filter((person: IPerson) => person.id !== id)
      );
      onRefresh();
    } catch (e) {
      console.log(e);
    }
  };

  const AddTextArea = () => {
    try {
      handleAddTextArea({ label: "Test", id: person.id });
      onRefresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={style.personCard} onClick={() => setModalOpen(true)}>
        <h1>{person.nickname || person.firstName}</h1>
        <p>
          {person.firstName} {person.lastName}
        </p>
      </div>
      <Modal
        modalContainerClass={style.personModal}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className={style.personModalContent}>
          <h1>{person.nickname}</h1>
          <p>
            {person.firstName} {person.lastName}
          </p>
          <div onClick={handleDeletePerson}>
            <UserTimesSolidSVG />
          </div>
          {person.additionalInputs.map((input: ICustomInput) => {
            return (
              <TextArea
                id={input.id}
                key={input.id}
                label={input.label}
                value={input.data}
                onRefresh={onRefresh}
              />
            );
          })}
          <button onClick={AddTextArea}>+</button>
        </div>
      </Modal>
    </div>
  );
}
