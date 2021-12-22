import * as React from "react";
import { UserPlusSVG } from "../assets/userPlus";
import style from "../styles/person.module.scss";

export interface IPersonPictureProps {}

export function PersonPicture(props: IPersonPictureProps) {
  const [personImage, setPersonImage] = React.useState<
    string | undefined | null
  >("");
  const personImageRef = React.createRef<HTMLInputElement>();

  React.useEffect(() => {}, [personImageRef]);

  const handleImageUpload = () => {
    const fileReader = new FileReader();
    //@ts-ignore
    fileReader.readAsDataURL(personImageRef.current?.files[0]);
    fileReader.onload = function (e) {
      // browser completed reading file - display it
      setPersonImage(e.target?.result?.toString());
      console.log(e.target?.result);
    };
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
        <input
          ref={personImageRef}
          type="file"
          onChange={() => {
            handleImageUpload();
          }}
          accept="image/*"
        />
      </div>
    </>
  );
}
