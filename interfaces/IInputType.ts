export enum inputType {
  textArea = "textArea",
  textInput = "text",
}

export interface ICustomInput {
  name: string;
  label: string;
  type: inputType;
  data: any;
  id: string;
}
