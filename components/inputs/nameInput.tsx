import * as React from "react";
import Label from "../label";
import style from "../../styles/input.module.scss";
import { inputType } from "../../interfaces/IInputType";

export interface INameInputProps {
  label: string;
  value: string;
  id: string;
  onRefresh: () => void;
  name: string;
  onEditLabel: (label: string) => void;
  onSave: (payload: string) => void;
}

export default function NameInput(props: INameInputProps) {
  const [value, setValue] = React.useState(props.value || "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDeleteInput = () => {};
  return (
    <>
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
        value={value}
        type={inputType.textInput}
        id={`textInputId-${props.id}`}
      />
    </>
  );
}
