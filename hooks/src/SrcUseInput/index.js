import React, { useState } from "react";

const useInput = (initValue, validator) => {
  const [value, setValue] = useState(initValue);
  const onChange = event => {
    const {
      target: { value }
    } = event;

    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return {
    value,
    onChange
  };
};

const maxLen = value => value.length <= 10;

export default () => {
  const userName = useInput("Mr.", maxLen);
  return (
    <div>
      <h1>useInput [MaxLength: 10]</h1>
      <input {...userName} type={"text"} />
    </div>
  );
};
