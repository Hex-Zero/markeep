import * as React from "react";
import { handleSaveTextArea, TextArea } from "../components/inputs/textArea";
import { handleSaveTextInput, TextInput } from "../components/inputs/textInput";
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
              onEditLabel={(label) =>
                handleEditLabel(props.person.id, input.id, label)
              }
              onSave={(payload) =>
                handleSaveTextArea({
                  personId: props.person.id,
                  inputId: input.id,
                  data: payload,
                })
              }
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
              onEditLabel={(label) =>
                handleEditLabel(props.person.id, input.id, label)
              }
              onSave={(data) =>
                handleSaveTextInput({
                  personId: props.person.id,
                  inputId: input.id,
                  data: data,
                })
              }
            />
          );
        }
      })}
    </>
  );
}
