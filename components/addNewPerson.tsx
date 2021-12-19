import { useFormik } from "formik";
import * as React from "react";
import { IPerson } from "../interfaces/IPerson";
import { v4 as uuidv4 } from "uuid";
import { addPersonData } from "../hooks/usePersonData";
import { useEffect, useRef } from "react";
import { inputType } from "../interfaces/IInputType";
import style from "../styles/input.module.scss";

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
      values.additionalInputs.push({
        name: "NoteArea",
        label: "New Note",
        id: uuidv4(),
        type: inputType.textArea,
        data: "",
      });
      addPersonData(personsData, values);
      handleAddNewPerson();
      resetForm();
    },
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onOpenModal && nameInputRef.current?.focus();
  }, [onOpenModal]);

  return (
    <form className={style.addPersonContainer} onSubmit={handleSubmit}>
      <label className={style.label} htmlFor="firstName">
        First Name
      </label>
      <input
        className={style.textInput}
        ref={nameInputRef}
        type="text"
        name="firstName"
        onChange={handleChange}
        value={values.firstName}
      />
      <label className={style.label} htmlFor="lastName">
        Last Name
      </label>
      <input
        className={style.textInput}
        type="text"
        name="lastName"
        onChange={handleChange}
        value={values.lastName}
      />

      <label className={style.label} htmlFor="nickname">
        Nickname
      </label>
      <input
        className={style.textInput}
        type="text"
        name="nickname"
        onChange={handleChange}
        value={values.nickname}
      />

      <button className={style.addPersonButton} type="submit">
        Add Person
      </button>
    </form>
  );
}
