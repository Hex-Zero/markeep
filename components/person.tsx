import * as React from "react";

export interface IPersonProps {
  nickname: string;
  fistName: string;
  lastName: string;
  id: string;
}

export default function Person({ nickname, fistName, lastName }: IPersonProps) {
  return (
    <div>
      <h1>{nickname}</h1>
      <p>
        {fistName} {lastName}
      </p>
    </div>
  );
}
