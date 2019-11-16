import React, { useEffect } from "react";
// 해당 페이지는 iframe이라서 제대로 동작하지 않을 수 있다.
// 그래서 browser url로 접근해서 결과를 확인하도록 한다.
const useBeforeLeave = onBefore => {
  useEffect(() => {
    if (!onBefore || typeof onBefore !== "function") {
      return;
    }
    const handle = mouseEvent => {
      const { clientY } = mouseEvent;
      if (clientY <= 0) {
        onBefore();
        console.log("Please Mouse Down");
      } else if (clientY >= 0) {
        onBefore();
        console.log("Please Moue Up");
      }
      onBefore();
    };
    document.addEventListener("mouseleave", handle);

    return () => {
      document.removeEventListener("mouseleave", handle);
    };
  }, []);
};
export default () => {
  const onBefore = () => console.log("Please don`t leave");
  useBeforeLeave(onBefore);
  return (
    <div>
      <h2>use Before Leave</h2>
    </div>
  );
};
