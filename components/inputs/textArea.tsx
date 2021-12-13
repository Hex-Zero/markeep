import * as React from "react";
import { ICustomInput, IPerson } from "../../interfaces/IPerson";
import { getPersonData, setPersonDate } from "../../hooks/usePersonData";

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
