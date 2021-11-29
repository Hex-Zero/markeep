import { IPerson } from "../../interfaces/IPerson";

interface IPersonsDataState {
  personsData: IPerson[];
  personsDataLoading: boolean;
  personsDataError: string;
}

const presonsDataReducer = (state: IPersonsDataState, action: any) => {
  switch (action.type) {
    case "SET_PERSONS_DATA":
      return action.payload;

    default:
      return state;
  }
};

export default presonsDataReducer;
