import type { NextPage } from "next";
import Person from "../components/person";
import { v4 as uuidv4 } from "uuid";

interface IPerson {
  id: string;
  nickname: string;
  firstName: string;
  lastName: string;
}

interface data {
  person: IPerson[];
}

const data = [
  {
    id: uuidv4(),
    nickname: "Juan",
    firstName: "Juan",
    lastName: "Perez",
  },
];

const Home: NextPage = () => {
  return (
    <div className="mrk-hello">
      {data.map((person) => (
        <Person
          key={person.id}
          fistName={person.firstName}
          lastName={person.lastName}
          nickname={person.nickname}
        />
      ))}
    </div>
  );
};

export default Home;
