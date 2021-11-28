import { useFormik } from "formik";
import * as React from "react";

export interface IAddNewPersonProps {}

export default function AddNewPerson(props: IAddNewPersonProps) {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      nickname: "",
      fistName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">Nickname</label>
      <input
        type="text"
        name="nickname"
        onChange={handleChange}
        value={values.nickname}
      />
      <label htmlFor="fistName">First Name</label>
      <input
        type="text"
        name="fistName"
        onChange={handleChange}
        value={values.fistName}
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
