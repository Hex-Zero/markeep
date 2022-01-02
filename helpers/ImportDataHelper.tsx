import * as React from "react";

export interface IImportDataHelperProps {}

export function ImportDataHelper(props: IImportDataHelperProps) {
  const inputFileRef = React.createRef<HTMLInputElement>();
  const [importDataInputValue, setImportDataInputValue] = React.useState("");

  const readFile = (file?: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        // browser completed reading file - display it
        console.log(JSON.parse(e.target?.result as string));
      };
    }
  };

  React.useEffect(() => {
    // ts-ignore
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
