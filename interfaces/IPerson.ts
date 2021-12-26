import { ICustomInput } from "./IInputType";

export interface IPerson {
  id: string;
  imageSrc?: string;
  additionalInputs: ICustomInput[];
}
