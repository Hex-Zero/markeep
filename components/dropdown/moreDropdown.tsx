import * as React from "react";
import { EllipsisVSolid } from "../../assets/ellipsisVSolid";
import style from "../../styles/dropdown.module.scss";

export interface IMoreDropdownProps {
  children: React.ReactNode;
}

export default function MoreDropdown(props: IMoreDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDropdownOpen = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={handleDropdownOpen}
        className={`${style.dropdownOverlay} ${
          isOpen && style.dropdownOverlayActive
        }`}
      ></div>
      <div
        className={style.personMoreDropdownButton}
        onClick={handleDropdownOpen}
      >
        <EllipsisVSolid></EllipsisVSolid>
        {isOpen && (
          <div className={`${style.personMoreDropdownContainer}`}>
            {props.children}
          </div>
        )}
      </div>
    </>
  );
}
