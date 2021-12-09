import { useFormik } from "formik";
import * as React from "react";
import { IPerson } from "../interfaces/IPerson";
import { v4 as uuidv4 } from "uuid";
import { addPersonData } from "../hooks/usePersonData";
import { useEffect, useRef } from "react";

export interface IAddNewPersonProps {
  personsData: IPerson[];
  handleAddNewPerson: () => void;
  onOpenModal: boolean;
}

export default function AddNewPerson({
  personsData,
  handleAddNewPerson,
  onOpenModal,
}: IAddNewPersonProps) {
  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      id: "",
      nickname: "",
      firstName: "",
      lastName: "",
      additionalInputs: [],
    },
    onSubmit: (values: IPerson) => {
      values.id = uuidv4();
      addPersonData(personsData, values);
      handleAddNewPerson();
      resetForm();
    },
  });

  const nicknameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onOpenModal && nicknameInput.current?.focus();
  }, [onOpenModal]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">Nickname</label>
      <input
        ref={nicknameInput}
        type="text"
        name="nickname"
        onChange={handleChange}
        value={values.nickname}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        value={values.lastName}
      />

      <button type="submit">Add Person</button>
    </form>
  );
}
