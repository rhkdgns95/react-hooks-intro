import React, { useState, useEffect } from "react";
// useNetwork는 navigator가 online또는 offline되는것을 막아준다.
const useNetwork = onChange => {
  //navigator가 online이 true or false인지를 저장한다.
  const [status, setStatus] = useState(navigator.onLine);

  const handleChange = event => {
    if (typeof onChange !== "function") {
      return;
    }
    setStatus(navigator.onLine);
    onChange(status);
  };

  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);

    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};
export default () => {
  const handleChangeNetwork = online => {
    console.log(`${online ? "We just went online." : "We are offline."}`);
  };
  const isOnline = useNetwork(handleChangeNetwork);
  return (
    <div>
      <h2>use Network</h2>
      <p>{isOnline ? "Online" : "Offline"}</p>
    </div>
  );
};
