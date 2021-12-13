import { useState } from "react";
import * as React from "react";
import { getPersonData, setPersonDate } from "../hooks/usePersonData";
import { ICustomInput, inputType, IPerson } from "../interfaces/IPerson";
import { Modal } from "./dialogs/modal";
import style from "../styles/person.module.scss";
import { TextArea } from "./inputs/textArea";
import { UserTimesSolidSVG } from "../assets/userTimesSolidSVG";
import { v4 as uuidv4 } from "uuid";

export interface IPersonProps {
  person: IPerson;
  nickname: string;
  fistName: string;
  lastName: string;
  id: string;
  onRefetch: () => void;
}

export default function Person({
  person,
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

  const handleAddInput = () => {
    const newInputs: ICustomInput = {
      name: "Test",
      label: "Test",
      type: inputType.textArea,
      data: "",
      id: uuidv4(),
    };
    setPersonDate(
      getPersonData().map((person: IPerson) => {
        if (person.id === id) {
          person.additionalInputs.push(newInputs);
        }
        return person;
      })
    );
    onRefetch();
  };

  return (
    <div>
      <div className={style.personCard} onClick={() => setModalOpen(true)}>
        <h1>{nickname}</h1>
        <p>
          {fistName} {lastName}
        </p>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h1>{nickname}</h1>
        <p>
          {fistName} {lastName}
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
            />
          );
        })}
        <button onClick={handleAddInput}>+</button>
      </Modal>
    </div>
  );
}
