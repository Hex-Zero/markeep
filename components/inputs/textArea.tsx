import * as React from "react";
import { ICustomInput, inputType, IPerson } from "../../interfaces/IPerson";
import { getPersonData, setPersonDate } from "../../hooks/usePersonData";
import { v4 as uuidv4 } from "uuid";

export interface IAddNewTextAreaProps {
  label: string;
  id: string;
}

export const handleAddTextArea = (props: IAddNewTextAreaProps) => {
  const newInputs: ICustomInput = {
    name: "Test",
    label: "Test",
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
      <div className="labelContainer">
        <label htmlFor={`textAreaId-${props.id}`}>{props.label}</label>
        <div onClick={() => handleDeleteInput()}>x</div>
      </div>
      <textarea id={`textAreaId-${props.id}`} />{" "}
    </>
  );
}
