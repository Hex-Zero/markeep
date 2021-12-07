import { IPerson } from "../interfaces/IPerson";

export function getPersonData() {
  return JSON.parse(localStorage.getItem("personArray") || "[]");
}

export function setPersonDate(personArray: IPerson[]) {
  localStorage.setItem("personArray", JSON.stringify(personArray));
}
