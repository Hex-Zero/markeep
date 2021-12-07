import { IPerson } from "../interfaces/IPerson";

export function getPersonData(): IPerson[] {
  return JSON.parse(localStorage.getItem("personArray") || "[]");
}

export function setPersonDate(personArray: IPerson[]) {
  localStorage.setItem("personArray", JSON.stringify(personArray));
}
