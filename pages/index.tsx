import type { NextPage } from "next";
import Person from "../components/person";

import { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";
import { Modal } from "../components/dialogs/modal";
import buttonStyles from "../styles/button.module.scss";
import { getPersonData } from "../hooks/usePersonData";
import style from "../styles/person.module.scss";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);

  const refresh = () => {
    setData(getPersonData);
    console.log(data);
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
    <main>
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
          onOpenModal={showAddPersonModal}
        ></AddNewPerson>
      </Modal>
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
  );
};

export default Home;
