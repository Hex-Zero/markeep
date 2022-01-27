import faker from "faker";
import { IPerson } from "../interfaces/IPerson";
import { v4 as uuidv4 } from "uuid";
import { inputType } from "../interfaces/IInputType";

export const getSeedData = (amount: number = 0) => {
  const seedData: IPerson[] = [];
  if (amount) {
    for (let i = 0; i < amount; i++) {
      seedData.push({
        id: uuidv4(),
        imageSrc: "",
        additionalInputs: [
          {
            id: uuidv4(),
            label: faker.name.firstName(),
            data: faker.name.firstName() + " " + faker.name.lastName(),
            type: inputType.textInput,
            name: "Name",
          },
        ],
      });
    }
  }
  return seedData;
};
