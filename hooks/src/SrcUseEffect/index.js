import React from "react";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [number, setNumber] = useState(0);
  const [aNumber, setANumber] = useState(0);
  return {
    number,
    setNumber,
    aNumber,
    setANumber
  };
};
export default () => {
  const { number, aNumber, setNumber, setANumber } = useFetch();
  const sayHello = () => console.log("hello");

  useEffect(sayHello, [number]);

  return (
    <div>
      <h2>Use Effect</h2>
      <button onClick={e => setNumber(number + 1)}>number - {number}</button>
      <button onClick={e => setANumber(aNumber + 1)}>
        aNumber - {aNumber}
      </button>
    </div>
  );
};
