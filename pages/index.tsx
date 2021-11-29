import type { NextPage } from "next";
import Person from "../components/person";

import { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);

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

  return (
    <div className="mrk-hello">
      <AddNewPerson
        personsData={data}
        handleAddNewPerson={() => getPersons()}
      ></AddNewPerson>

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
