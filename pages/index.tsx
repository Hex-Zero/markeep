import type { NextPage } from "next";
import Person from "../components/person";

import { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "../components/dialogs/modal";
import buttonStyles from "../styles/button.module.scss";
import { getPersonData } from "../hooks/usePersonData";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState("passive");

  useEffect(() => {
    // localStorage.setItem("personArray", JSON.stringify([]));
  });

  useEffect(() => {
    if (!data.length && localStorage != null) {
      setData(getPersonData);
    }
  }, [setData, data.length]);

  const handleOpenAddPersonModal = () => {
    setShowAddPersonModal("open");
    setTimeout(() => setShowAddPersonModal("passive"), 1);
  };

  const handleAddPerson = () => {
    setData(getPersonData);
    setShowAddPersonModal("close");
    setTimeout(() => setShowAddPersonModal("passive"), 1);
  };

  return (
    <div className="mrk-hello">
      <div
        className={`${buttonStyles.openAddButton}`}
        onClick={handleOpenAddPersonModal}
      ></div>
      <Modal isOpen={showAddPersonModal}>
        <AddNewPerson
          personsData={data}
          handleAddNewPerson={handleAddPerson}
        ></AddNewPerson>
      </Modal>

      {data.map((person) => {
        return (
          <Person
            key={person.id}
            id={person.id}
            fistName={person.firstName}
            lastName={person.lastName}
            nickname={person.nickname}
          />
        );
      })}
    </div>
  );
};

export default Home;
