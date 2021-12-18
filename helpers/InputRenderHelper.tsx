import * as React from "react";
import { TextArea } from "../components/inputs/textArea";
import { TextInput } from "../components/inputs/textInput";
import { ICustomInput, inputType } from "../interfaces/IInputType";
import { IPerson } from "../interfaces/IPerson";
import { handleEditLabel } from "../components/label";

export interface IInputRenderHelperProps {
  person: IPerson;
  onRefresh: () => void;
}

export default function InputRenderHelper(props: IInputRenderHelperProps) {
  return (
    <>
      {props.person.additionalInputs.map((input: ICustomInput) => {
        if (input.type === inputType.textArea) {
          return (
            <TextArea
              id={input.id}
              key={input.id}
              label={input.label}
              value={input.data}
              onRefresh={props.onRefresh}
              onEditLabel={(e) => handleEditLabel(props.person.id, input.id, e)}
            />
          );
        } else if (input.type === inputType.textInput) {
          return (
            <TextInput
              id={input.id}
              name={input.name}
              key={input.id}
              label={input.label}
              value={input.data}
              onRefresh={props.onRefresh}
              onEditLabel={(e) => handleEditLabel(props.person.id, input.id, e)}
            />
          );
        }
      })}
    </>
  );
}
