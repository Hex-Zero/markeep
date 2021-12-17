import * as React from "react";
import style from "../styles/input.module.scss";

export interface ILabelProps {
  label: string;
  id: string;
  handleDeleteInput: () => void;
}

export default function Label(props: ILabelProps) {
  return (
    <div>
      <div className={style.labelContainer}>
        <label htmlFor={`textInputId-${props.id}`}>{props.label}</label>
        <div onClick={() => props.handleDeleteInput()}>x</div>
      </div>
    </div>
  );
}
