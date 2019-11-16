import React, { useState } from "react";

export default () => {
  const [item, setItem] = useState(0);
  const increment = () => setItem(item + 1);
  const decrement = () => setItem(item - 1);

  return (
    <div>
      <h2>useState - {item}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
