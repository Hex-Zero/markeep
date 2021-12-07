interface ICustomInput {
  name: string;
  label: string;
  type: string;
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
