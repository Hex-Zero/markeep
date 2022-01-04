import * as React from "react";
import { getPersonsData, setPersonsData } from "../hooks/usePersonData";
import style from "../styles/input.module.scss";

export interface IImportDataHelperProps {
  onRefresh: () => void;
  getImportInputRef: (ref: HTMLInputElement) => void;
  inputClicked?: boolean;
}

export function ImportDataHelper(props: IImportDataHelperProps) {
  const inputFileRef = React.createRef<HTMLInputElement>();
  const [importDataInputValue, setImportDataInputValue] = React.useState("");

  const readFile = (file?: File | null) => {
    const currentData = getPersonsData();

    if (file) {
      try {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
          // browser completed reading file - display it
          setPersonsData([...JSON.parse(e.target?.result as string)]);
        };
        console.log("import successful - person data updated");
        setTimeout(() => {
          props.onRefresh();
        }, 100);
      } catch (e) {
        console.log(e);
        console.log("import failed - changes reverted");
        setPersonsData(currentData);
      }
    }
  };

  React.useEffect(() => {
    props.getImportInputRef(inputFileRef.current!);
  }, []);

  React.useEffect(() => {
    if (importDataInputValue) {
      readFile(inputFileRef?.current?.files?.[0]);
    }
  }, [importDataInputValue]);

  return (
    <>
      <input
        type="file"
        className={style.importDataInput}
        ref={inputFileRef}
        value={importDataInputValue}
        onChange={(e) => {
          setImportDataInputValue(e.target.value);
        }}
      />
    </>
  );
}
