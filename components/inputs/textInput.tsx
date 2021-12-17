import * as React from "react";
import { ICustomInput, inputType } from "../../interfaces/IInputType";
import { v4 as uuidv4 } from "uuid";
import { getPersonData, setPersonDate } from "../../hooks/usePersonData";
import { IPerson } from "../../interfaces/IPerson";
import Label from "../label";

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
      <Label
        label={props.label}
        id={props.id}
        handleDeleteInput={handleDeleteInput}
      />
      <input type={inputType.textInput} id={`textInputId-${props.id}`} />
    </div>
  );
}
