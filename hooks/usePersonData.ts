import { IPerson } from "../interfaces/IPerson";

export function getPersonsData(): IPerson[] {
  return JSON.parse(localStorage.getItem("personArray") || "[]");
}

export function setPersonsData(personArray: IPerson[]) {
  window.localStorage?.setItem("personArray", JSON.stringify(personArray));
}

export function addPersonData(personsData: IPerson[], person: IPerson) {
  window.localStorage?.setItem(
    "personArray",
    JSON.stringify([person, ...personsData])
  );
}
