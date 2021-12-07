import * as React from "react";

export interface ITextAreaProps {
  label: string;
  value?: string;
  id: string;
}

export function TextArea(props: ITextAreaProps) {
  return (
    <>
      <label htmlFor={`textAreaId-${props.id}`}>{props.label}</label>
      <textarea id={`textAreaId-${props.id}`} />
    </>
  );
}
