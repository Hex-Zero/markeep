export enum inputType {
  textArea = "textArea",
  textInput = "text",
}

export interface ICustomInput {
  name: string;
  label: string;
  type: inputType;
  data: string;
  id: string;
}
