import * as React from "react";
import { UserPlusSVG } from "../assets/userPlus";
import style from "../styles/person.module.scss";

export interface IPersonPictureProps {}

export function PersonPicture(props: IPersonPictureProps) {
  return (
    <>
      <div className={style.personPictureContainer}>
        <UserPlusSVG></UserPlusSVG>
      </div>
    </>
  );
}
