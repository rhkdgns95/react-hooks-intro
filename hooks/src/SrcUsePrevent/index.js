import React from "react";

const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = ""; // 작성하지 않으면 크롬이 beforeunload를 인식하지 못함.
  };
  // event - beforeunload는 window가 닫힐때 실행되는 함수이다.
  // window가 닫힐때 함수가 실행되는것을 허락하여 listener가 실행된다.
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return {
    enablePrevent,
    disablePrevent
  };
};
export default () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div>
      <h2>src Use Prevent</h2>
      <button onClick={enablePrevent}>enable Prevent</button>
      <button onClick={disablePrevent}>disable Prevent</button>
    </div>
  );
};
