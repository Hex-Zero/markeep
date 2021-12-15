import * as React from "react";
import style from "../../styles/dropdown.module.scss";

export interface IPersonMoreDropdownProps {
  children: React.ReactNode;
}

export default function PersonMoreDropdown(props: IPersonMoreDropdownProps) {
  return (
    <>
      <div className={`${style.dropdownOverlay}`}></div>
      <button>open</button>
      <div className={`${style.personMoreDropdownContainer}`}>
        {props.children}
      </div>
    </>
  );
}
