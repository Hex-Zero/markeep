import * as React from "react";
import style from "../styles/input.module.scss";

export interface ISearchBarProps {
  getInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
}

export function SearchBar(props: ISearchBarProps) {
  const [value, setValue] = React.useState("");

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
