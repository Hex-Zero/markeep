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
  const [name, setName] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      id: "",
      additionalInputs: [
        {
          name: "Name",
          id: "",
          label: "",
          type: inputType.textInput,
          data: "",
        },
      ],
    },
    onSubmit: (values: IPerson) => {
      values.additionalInputs[0].data = name;
      values.additionalInputs[0].label = nickName
        ? nickName
        : name?.replace(/ .*/, "");
      values.id = uuidv4();
      addPersonData(personsData, values);
      handleAddNewPerson();
      resetForm();
      setName("");
      setNickName("");
    },
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onOpenModal && nameInputRef.current?.focus();
  }, [onOpenModal]);

  return (
    <form className={style.addPersonContainer} onSubmit={handleSubmit}>
      <label className={style.label} htmlFor="name">
        Name
      </label>
      <input
        className={style.textInput}
        ref={nameInputRef}
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label className={style.label} htmlFor="nickname">
        Nickname
      </label>
      <input
        className={style.textInput}
        type="text"
        name="nickname"
        onChange={(e) => setNickName(e.target.value)}
        value={nickName}
      />

      <button className={style.addPersonButton} type="submit">
        Add Person
      </button>
    </form>
  );
}
