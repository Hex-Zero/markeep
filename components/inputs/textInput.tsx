import * as React from "react";
import style from "../../styles/input.module.scss";

export interface ITextInputProps {
  label: string;
  value: string;
  id: string;
  onRefresh: () => void;
  name: string;
}

export default function TextInput(props: ITextInputProps) {
  const handleDeleteInput = () => {
    props.onRefresh();
  };

  return (
    <div>
      <div className={style.labelContainer}>
        <label htmlFor={`textInputId-${props.id}`}>{props.label}</label>
        <div onClick={() => handleDeleteInput()}>x</div>
      </div>
      <input id={`textInputId-${props.id}`} />
    </div>
  );
}
