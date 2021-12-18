import * as React from "react";
import { TimesSolid } from "../assets/timeSolid";
import { getPersonData, setPersonDate } from "../hooks/usePersonData";
import { ICustomInput } from "../interfaces/IInputType";
import { IPerson } from "../interfaces/IPerson";
import style from "../styles/input.module.scss";

export const handleEditLabel = (
  personId: string,
  inputId: string,
  label: string
) => {
  setPersonDate(
    getPersonData().map((person: IPerson) => {
      if (person.id === personId) {
        person.additionalInputs.map((input: ICustomInput) => {
          if (input.id === inputId) {
            input.label = label;
          }
        });
      }
      return person;
    })
  );
};

export interface ILabelProps {
  label: string;
  id: string;
  handleDeleteInput: () => void;
  onEditLabel: (label: string) => void;
}

export default function Label(props: ILabelProps) {
  const labelInputRef = React.useRef<HTMLInputElement>(null);
  const [label, setLabel] = React.useState(props.label);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    setIsEditing(true);
  }, [label]);

  React.useEffect(() => {
    setIsEditing(false);
  }, []);

  const handleEditLabel = (edit: boolean) => {
    if (edit) {
      labelInputRef?.current?.focus();
      setIsEditing(true);
    } else {
      props.onEditLabel(label);
      setIsEditing(false);
    }
  };
  return (
    <>
      <div className={style.labelContainer}>
        <label htmlFor={`textInputId-${props.id}`}>
          <input
            ref={labelInputRef}
            onChange={(e) => setLabel(e.target.value)}
            value={label}
            onBlur={() => handleEditLabel(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                labelInputRef?.current?.blur();
              }
            }}
          />
          {/* 
          {isEditing ? <div>SAVE</div> : <div>EDIT</div>} */}
        </label>

        <div onClick={() => props.handleDeleteInput()}>
          <TimesSolid></TimesSolid>
        </div>
      </div>
    </>
  );
}
