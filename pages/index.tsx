import type { NextPage } from "next";
import Person from "../components/person";

import { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";
import { Modal, modalState } from "../components/dialogs/modal";
import buttonStyles from "../styles/button.module.scss";
import { getPersonData } from "../hooks/usePersonData";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(true);

  useEffect(() => {
    // localStorage.setItem("personArray", JSON.stringify([]));
  });

  useEffect(() => {
    if (!data.length && localStorage != null) {
      setData(getPersonData);
    }
  }, [setData, data.length]);

  const handleAddPerson = () => {
    setData(getPersonData);
    setShowAddPersonModal(false);
  };

  return (
    <div className="mrk-hello">
      <div
        className={`${buttonStyles.openAddButton}`}
        onClick={() => setShowAddPersonModal(true)}
      ></div>
      <Modal
        isOpen={showAddPersonModal}
        onClose={() => setShowAddPersonModal(false)}
      >
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
