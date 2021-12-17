import { useState } from "react";
import * as React from "react";
import { getPersonData, setPersonDate } from "../hooks/usePersonData";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "./dialogs/modal";
import style from "../styles/person.module.scss";
import { TextArea, handleAddTextArea } from "./inputs/textArea";
import { UserTimesSolidSVG } from "../assets/userTimesSolidSVG";
import { ICustomInput, inputType } from "../interfaces/IInputType";
import { TextInput, handleAddTextInput } from "./inputs/textInput";
import PersonMoreDropdown from "./dropdown/personMoreDropdown";
import InputRenderHelper from "../helpers/inputRenderHelper";

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

  const AddTextInput = () => {
    try {
      handleAddTextInput("Test", person.id);
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
          <PersonMoreDropdown>Hello</PersonMoreDropdown>
          <InputRenderHelper person={person} onRefresh={onRefresh} />
          <button onClick={AddTextArea}>+</button>
          <button onClick={AddTextInput}>+</button>
        </div>
      </Modal>
    </div>
  );
}
