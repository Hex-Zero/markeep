import * as React from "react";
import style from "../styles/input.module.scss";

export interface ISearchBarProps {
  getInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
}

export function SearchBar(props: ISearchBarProps) {
  React.useEffect(() => {
    props.getInputRef(inputRef);
  }, []);

  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={style.searchBarContainer}>
      <input
        ref={inputRef}
        className={style.searchBar}
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
