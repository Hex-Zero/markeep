import * as React from "react";
import { IPerson } from "../../interfaces/IPerson";
import { getPersonsData, setPersonsData } from "../../hooks/usePersonData";
import { v4 as uuidv4 } from "uuid";
import style from "../../styles/input.module.scss";
import { ICustomInput, inputType } from "../../interfaces/IInputType";
import Label from "../label";

export interface IAddNewTextAreaProps {
  label?: string;
  personId: string;
}

export interface ISaveTextAreaProps {
  personId: string;
  inputId: string;
  data: string;
}

export const handleAddTextArea = (props: IAddNewTextAreaProps) => {
  const newInputs: ICustomInput = {
    name: "NoteArea",
    label: props.label || "New Note",
    type: inputType.textArea,
    data: "",
    id: uuidv4(),
  };
  setPersonsData(
    getPersonsData().map((person: IPerson) => {
      if (person.id === props.personId) {
        person.additionalInputs.push(newInputs);
      }
      return person;
    })
  );
};

export const handleSaveTextArea = (props: ISaveTextAreaProps) => {
  setPersonsData(
    getPersonsData().map((person: IPerson) => {
      if (person.id === props.personId) {
        person.additionalInputs.map((input: ICustomInput) => {
          if (input.id === props.inputId) {
            input.data = props.data;
          }
        });
      }
      return person;
    })
  );
};

export interface ITextAreaProps {
  label: string;
  value: string;
  id: string;
  onRefresh: () => void;
  onEditLabel: (label: string) => void;
  onSave: (payload: string) => void;
}

export function TextArea(props: ITextAreaProps) {
  const [value, setValue] = React.useState(props.value || "");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleDeleteInput = () => {
    setPersonsData(
      getPersonsData().map((person: IPerson) => {
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
      <Label
        label={props.label}
        id={props.id}
        handleDeleteInput={handleDeleteInput}
        onEditLabel={(label) => props.onEditLabel(label)}
      />
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={style.textInput}
        id={`textAreaId-${props.id}`}
        onBlur={() => props.onSave(value)}
      />
    </>
  );
}
