import * as React from "react";
import { ICustomInput, inputType } from "../../interfaces/IInputType";
import { v4 as uuidv4 } from "uuid";
import { getPersonData, setPersonDate } from "../../hooks/usePersonData";
import { IPerson } from "../../interfaces/IPerson";
import Label from "../label";
import style from "../../styles/input.module.scss";

export interface ISaveTextInputProps {
  personId: string;
  inputId: string;
  data: string;
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

export const handleSaveTextInput = (props: ISaveTextInputProps) => {
  setPersonDate(
    getPersonData().map((person: IPerson) => {
      if (person.id === props.personId) {
        console.log("person Found");

        person.additionalInputs.map((input: ICustomInput) => {
          if (input.id === props.inputId) {
            console.log("input Found");
            console.log(props);

            input.data = props.data;
          }
        });
      }
      return person;
    })
  );
};
export interface ITextInputProps {
  label: string;
  value: string;
  id: string;
  onRefresh: () => void;
  name: string;
  onEditLabel: (label: string) => void;
  onSave: (payload: string) => void;
}

export function TextInput(props: ITextInputProps) {
  const [value, setValue] = React.useState(props.value);
  const inputRef = React.useRef<HTMLInputElement>(null);
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
        onEditLabel={(label) => props.onEditLabel(label)}
      />
      <input
        className={style.textInput}
        ref={inputRef}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={() => props.onSave(value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            inputRef?.current?.blur();
          }
        }}
        type={inputType.textInput}
        id={`textInputId-${props.id}`}
      />
    </div>
  );
}
