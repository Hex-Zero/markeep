import { ICustomInput } from "./IInputType";

export interface IPerson {
  id: string;
  nickname: string;
  firstName: string;
  lastName: string;
  additionalInputs: ICustomInput[];
}
