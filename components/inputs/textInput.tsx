import * as React from "react";
import { ICustomInput, inputType } from "../../interfaces/IInputType";
import style from "../../styles/input.module.scss";
import { v4 as uuidv4 } from "uuid";
import { getPersonData, setPersonDate } from "../../hooks/usePersonData";
import { IPerson } from "../../interfaces/IPerson";

export interface ITextInputProps {
  label: string;
  value: string;
  id: string;
  onRefresh: () => void;
  name: string;
}

export const handleAddTextInput = (label: string, personId: string) => {
  const newInputs: ICustomInput = {
    name: "input",
    label: label || "New Input",
    type: inputType.textInput,
    data: "",
    id: uuidv4(),
  };
  setPersonDate(
    getPersonData().map((person: IPerson) => {
      if (person.id === personId) {
        person.additionalInputs.push(newInputs);
      }
      return person;
    })
  );
};

export function TextInput(props: ITextInputProps) {
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
    <div>
      <div className={style.labelContainer}>
        <label htmlFor={`textInputId-${props.id}`}>{props.label}</label>
        <div onClick={() => handleDeleteInput()}>x</div>
      </div>
      <input type={inputType.textInput} id={`textInputId-${props.id}`} />
    </div>
  );
}
