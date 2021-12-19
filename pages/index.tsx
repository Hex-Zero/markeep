import type { NextPage } from "next";
import Person from "../components/person";

import React, { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "../components/dialogs/modal";
import buttonStyles from "../styles/button.module.scss";
import { getPersonData } from "../hooks/usePersonData";
import style from "../styles/person.module.scss";
import { SearchBar, searchData } from "../components/SearchBar";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);
  const [queryData, setQueryData] = useState<IPerson[]>([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(
    null
  );

  const refresh = () => {
    setData(getPersonData);
    setQueryData(getPersonData);
  };

  const handleSearchData = (query: string) => {
    setData(searchData(queryData, query));
  };

  useEffect(() => {
    if (!data.length && localStorage != null) {
      refresh();
    }
  }, [setData, data.length]);

  const handleAddPerson = () => {
    setShowAddPersonModal(false);
    refresh();
  };

  return (
    <>
      <main>
        <div
          className={`${buttonStyles.openAddButton}`}
          onClick={() => setShowAddPersonModal(true)}
        ></div>
        <Modal
          isOpen={showAddPersonModal}
          onClose={() => setShowAddPersonModal(false)}
          maxWidth="350px"
        >
          <AddNewPerson
            personsData={data}
            handleAddNewPerson={handleAddPerson}
            onOpenModal={showAddPersonModal}
          ></AddNewPerson>
        </Modal>
        <SearchBar
          onSearch={(e) => {
            handleSearchData(searchInputRef?.value || "");
          }}
          getInputRef={(ref) => {
            setSearchInputRef(ref.current);
            ref?.current?.focus();
          }}
        ></SearchBar>
        <div className={style.personsContainer}>
          {data.map((person) => {
            return (
              <Person
                person={person}
                key={person.id}
                id={person.id}
                onRefresh={() => refresh()}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
