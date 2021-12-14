import * as React from "react";
import { IPerson } from "../../interfaces/IPerson";
import { getPersonData, setPersonDate } from "../../hooks/usePersonData";
import { v4 as uuidv4 } from "uuid";
import style from "../../styles/input.module.scss";
import { ICustomInput, inputType } from "../../interfaces/IInputType";

export interface IAddNewTextAreaProps {
  label: string;
  id: string;
}

export const handleAddTextArea = (props: IAddNewTextAreaProps) => {
  const newInputs: ICustomInput = {
    name: "NoteArea",
    label: "New Note",
    type: inputType.textArea,
    data: "",
    id: uuidv4(),
  };
  setPersonDate(
    getPersonData().map((person: IPerson) => {
      if (person.id === props.id) {
        person.additionalInputs.push(newInputs);
      }
      return person;
    })
  );
};

export interface ITextAreaProps {
  label: string;
  value?: string;
  id: string;
  onRefresh: () => void;
}

export function TextArea(props: ITextAreaProps) {
  const handleDeleteInput = () => {
    setPersonDate(
      getPersonData().map((person: IPerson) => {
        person.additionalInputs = person.additionalInputs.filter(
          (input: ICustomInput) => input.id !== props.id
        );
        return person;
      })
    );
    props.onRefresh();
  };

  return (
    <>
      <div className={style.labelContainer}>
        <label htmlFor={`textAreaId-${props.id}`}>{props.label}</label>
        <div onClick={() => handleDeleteInput()}>x</div>
      </div>
      <textarea className={style.textAreaInput} id={`textAreaId-${props.id}`} />{" "}
    </>
  );
}
