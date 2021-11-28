import type { NextPage } from "next";
import Person from "../components/person";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

interface IPerson {
  id: string;
  nickname: string;
  firstName: string;
  lastName: string;
}

const Home: NextPage = () => {
  const [data, setData] = useState<IPerson[]>([]);

  const handleAddNewPerson = () => {};

  useEffect(() => {
    // localStorage.setItem("personArray", JSON.stringify(dataa));
  });

  useEffect(() => {
    if (!data.length) {
      setData(JSON.parse(localStorage.getItem("personArray") || "[]"));
    }
  });

  return (
    <div className="mrk-hello">
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
