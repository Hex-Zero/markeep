import { useState } from "react";
import * as React from "react";
import { getPersonData, setPersonDate } from "../hooks/usePersonData";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "./dialogs/modal";
import style from "../styles/person.module.scss";
import { handleAddTextArea } from "./inputs/textArea";
import { handleAddTextInput } from "./inputs/textInput";
import PersonMoreDropdown from "./dropdown/personMoreDropdown";
import { InputRenderHelper } from "../helpers/InputRenderHelper";
import { PersonPicture } from "./personPicture";

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
      handleAddTextArea({ personId: id });
      onRefresh();
    } catch (e) {
      console.log(e);
    }
  };

  const AddTextInput = () => {
    try {
      handleAddTextInput({ personId: id });
      onRefresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={style.personCard} onClick={() => setModalOpen(true)}>
        <PersonPicture></PersonPicture>
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
        <PersonPicture></PersonPicture>
        <div className={style.personModalContent}>
          <section>
            <h1>{person.nickname}</h1>
            <p>
              {person.firstName} {person.lastName}
            </p>
          </section>
          <PersonMoreDropdown>
            <label>Add</label>
            <ul>
              <li onClick={AddTextInput}>Text Field</li>

              <li onClick={AddTextArea}>Text Area</li>
            </ul>
            <label>Manage</label>
            <ul>
              <li onClick={handleDeletePerson}>Delete</li>
            </ul>
          </PersonMoreDropdown>
          <InputRenderHelper person={person} onRefresh={onRefresh} />
        </div>
      </Modal>
    </div>
  );
}
