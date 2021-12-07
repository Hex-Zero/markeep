import type { NextPage } from "next";
import Person from "../components/person";

import { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "../components/dialogs/modal";
import buttonStyles from "../styles/button.module.scss";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);

  useEffect(() => {
    // localStorage.setItem("personArray", JSON.stringify([]));
  });

  useEffect(() => {
    if (!data.length && localStorage != null) {
      setData(JSON.parse(localStorage.getItem("personArray") || "[]"));
    }
  }, [setData, data.length]);

  const getPersons = () => {
    setData(JSON.parse(localStorage?.getItem("personArray") || "[]"));
  };

  const handleOpenAddPersonModal = () => {
    setShowAddPersonModal(true);
    setTimeout(() => setShowAddPersonModal(false), 1);
  };

  return (
    <div className="mrk-hello">
      <div
        className={buttonStyles.openAddButton}
        onClick={handleOpenAddPersonModal}
      ></div>
      <Modal isOpen={showAddPersonModal}>
        <AddNewPerson
          personsData={data}
          handleAddNewPerson={() => getPersons()}
        ></AddNewPerson>
      </Modal>

      {data.map((person) => {
        return (
          <Person
            key={person.id}
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
