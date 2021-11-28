import type { NextPage } from "next";
import Person from "../components/person";

import { useEffect, useState } from "react";
import AddNewPerson from "../components/addNewPerson";
import { IPerson } from "../interfaces/IPerson";

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);

  const getPersonsData = () => {};

  useEffect(() => {
    // localStorage.setItem("personArray", JSON.stringify(dataa));
  });

  useEffect(() => {
    if (!data.length && localStorage != null) {
      setData(JSON.parse(localStorage.getItem("personArray") || "[]"));
    }
  });

  return (
    <div className="mrk-hello">
      <AddNewPerson
        personsData={data}
        handleAddNewPerson={getPersonsData()}
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
