import * as React from "react";
import style from "../styles/input.module.scss";
import { IPerson } from "../interfaces/IPerson";
import { ICustomInput } from "../interfaces/IInputType";
export interface ISearchBarProps {
  getInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
}

export const searchData = (data: IPerson[], query: string): IPerson[] => {
  if (query === "") {
    return data;
  }
  return data.filter((person: IPerson) => {
    return person.additionalInputs
      .map((input: ICustomInput) => {
        return (
          input.data.toLowerCase().includes(query.toLowerCase()) ||
          input.label.toLowerCase().includes(query.toLowerCase())
        );
      })
      .includes(true);
  });
};

export function SearchBar(props: ISearchBarProps) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (value === "") {
      props.onSearch(value);
    }
  }, [value]);

  React.useEffect(() => {
    props.getInputRef(inputRef);
  }, []);

  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={style.searchBarContainer}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
        className={style.searchBar}
        type="text"
        placeholder="Search"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.onSearch(value);
          }
        }}
      />
    </div>
  );
}
