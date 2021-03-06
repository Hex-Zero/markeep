import { useState } from "react";
import * as React from "react";
import { getPersonsData, setPersonsData } from "../hooks/usePersonData";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "./dialogs/modal";
import style from "../styles/person.module.scss";
import { handleAddTextArea } from "./inputs/textArea";
import { handleAddTextInput } from "./inputs/textInput";
import MoreDropdown from "./dropdown/moreDropdown";
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
      setPersonsData(
        getPersonsData().filter((person: IPerson) => person.id !== id)
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
        <PersonPicture
          allowImageUpload={false}
          person={person}
          onRefresh={() => onRefresh()}
        ></PersonPicture>
        <h1>{person.additionalInputs[0].label}</h1>
        <p>{person.additionalInputs[0].data}</p>
      </div>
      <Modal
        modalContainerClass={style.personModal}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <PersonPicture
          allowImageUpload={true}
          person={person}
          onRefresh={() => onRefresh()}
        ></PersonPicture>

        <div className={style.personModalContent}>
          <MoreDropdown>
            <label>Add</label>
            <ul>
              <li onClick={AddTextInput}>Text Field</li>

              <li onClick={AddTextArea}>Text Area</li>
            </ul>
            <label>Manage</label>
            <ul>
              <li onClick={handleDeletePerson}>Delete</li>
            </ul>
          </MoreDropdown>
          <InputRenderHelper person={person} onRefresh={onRefresh} />
        </div>
      </Modal>
    </div>
  );
}
