import React from "react";

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }
  const fireNotif = () => {
    // 1. 먼저, 권한요청을한다.
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      // PUSH 권한이 이미 수락되어있다면,
      new Notification(title, options);
    }
  };
  return fireNotif;
};

export default () => {
  const triggerNotif = useNotification("React-hooks Push-MSG", {
    body: "Hello, this is amazing push message"
  });
  return (
    <div>
      <h2>use Notification</h2>
      <button onClick={triggerNotif}>notification</button>
    </div>
  );
};
