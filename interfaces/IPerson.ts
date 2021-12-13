export enum inputType {
  textArea,
}

export interface ICustomInput {
  name: string;
  label: string;
  type: inputType;
  data: any;
  id: string;
}

export interface IPerson {
  id: string;
  nickname: string;
  firstName: string;
  lastName: string;
  additionalInputs: ICustomInput[];
}
