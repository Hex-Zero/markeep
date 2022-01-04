import * as React from "react";
import { IUserPlusSVGProps, UserPlusSVG } from "../assets/userPlus";
import { getPersonsData, setPersonsData } from "../hooks/usePersonData";
import { IPerson } from "../interfaces/IPerson";
import style from "../styles/person.module.scss";

export interface IPersonPictureProps {
  allowImageUpload: boolean;
  person: IPerson;
  onRefresh: () => void;
}

export function PersonPicture(props: IPersonPictureProps) {
  const [personImage, setPersonImage] = React.useState<
    string | undefined | null
  >(props.person.imageSrc);
  const personImageRef = React.createRef<HTMLInputElement>();

  React.useEffect(() => {}, [personImageRef]);

  const handleImageUpload = () => {
    try {
      const fileReader = new FileReader();
      //@ts-ignore
      fileReader.readAsDataURL(personImageRef.current?.files[0]);
      fileReader.onload = function (e) {
        // browser completed reading file - display it
        setPersonsData(
          getPersonsData().map((person: IPerson) => {
            if (person.id === props.person.id) {
              person.imageSrc = e.target?.result?.toString();

              setPersonImage(e.target?.result?.toString());
            }
            return person;
          })
        );
      };
      props.onRefresh();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={style.personPictureContainer}>
        {personImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={personImage} alt="person"></img>
        ) : (
          <UserPlusSVG></UserPlusSVG>
        )}
        {props.allowImageUpload && (
          <input
            ref={personImageRef}
            type="file"
            onChange={() => {
              handleImageUpload();
            }}
            accept="image/*"
          />
        )}
      </div>
    </>
  );
}
