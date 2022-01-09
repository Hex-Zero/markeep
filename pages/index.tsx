import type { NextPage } from "next";
import Person from "../components/person";

import React, { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "../components/dialogs/modal";
import buttonStyles from "../styles/button.module.scss";
import { getPersonsData } from "../hooks/usePersonData";
import style from "../styles/person.module.scss";
import { SearchBar, searchData } from "../components/SearchBar";
import MoreDropdown from "../components/dropdown/moreDropdown";
import { exportToJsonFile } from "../hooks/manageDataFlow";
import { ImportDataHelper } from "../helpers/ImportDataHelper";
import { signIn, signOut, useSession } from "next-auth/react";
import { AnyRecord } from "dns";

const Home: NextPage = () => {
  //ts-ignore
  const { data, status } = useSession();

  const [personsData, setData] = useState<IPerson[]>([]);
  const [queryData, setQueryData] = useState<IPerson[]>([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(
    null
  );
  const [importInputRef, setImportInputRef] = useState<HTMLInputElement | null>(
    null
  );

  const findGreatestCommonDivisor = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return findGreatestCommonDivisor(b, a % b);
  };

  const refresh = () => {
    const newData = getPersonsData();
    setData(newData);
    setQueryData(newData);
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  };

  const handleSearchData = (query: string) => {
    setData(searchData(queryData, query));
  };

  const handleAddPerson = () => {
    setShowAddPersonModal(false);
    refresh();
  };

  const handleExport = () => {
    exportToJsonFile(personsData);
  };

  const handleImport = () => {
    importInputRef?.click();
  };

  useEffect(() => {
    if (!personsData.length && localStorage != null) {
      refresh();
    }
    console.log(findGreatestCommonDivisor(119, 544));
  }, [setData, personsData.length]);

  return (
    <main>
      {status === "loading" && <div>Loading..</div>}
      {!data ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      <div
        className={`${buttonStyles.openAddButton}`}
        onClick={() => setShowAddPersonModal(true)}
      ></div>
      <ImportDataHelper
        onRefresh={() => refresh()}
        getImportInputRef={(ref: HTMLInputElement) => setImportInputRef(ref)}
      ></ImportDataHelper>
      <MoreDropdown>
        <label>Settings</label>
        <ul>
          <li onClick={handleExport}>Export</li>
          <li onClick={handleImport}>Import</li>
        </ul>
      </MoreDropdown>

      <Modal
        isOpen={showAddPersonModal}
        onClose={() => setShowAddPersonModal(false)}
        maxWidth="350px"
      >
        <AddNewPerson
          personsData={personsData}
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
        {personsData.map((person) => {
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
  );
};

export default Home;
