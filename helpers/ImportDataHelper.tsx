import * as React from "react";
import { getPersonData, setPersonsData } from "../hooks/usePersonData";

export interface IImportDataHelperProps {}

export function ImportDataHelper(props: IImportDataHelperProps) {
  const inputFileRef = React.createRef<HTMLInputElement>();
  const [importDataInputValue, setImportDataInputValue] = React.useState("");

  const readFile = (file?: File | null) => {
    const currentData = getPersonData();

    if (file) {
      console.log("start reading file");

      try {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
          // browser completed reading file - display it
          setPersonsData([...JSON.parse(e.target?.result as string)]);
        };
        console.log("import successful - person data updated");
      } catch (e) {
        console.log(e);
        console.log("import failed - changes reverted");
        setPersonsData(currentData);
      }
    }
  };

  React.useEffect(() => {
    readFile(inputFileRef?.current?.files?.[0]);
  }, [inputFileRef]);

  return (
    <>
      <input
        type="file"
        ref={inputFileRef}
        value={importDataInputValue}
        onChange={(e) => {
          setImportDataInputValue(e.target.value);
        }}
      />
    </>
  );
}
