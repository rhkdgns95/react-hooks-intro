import React, { useRef, useEffect, useState } from "react";

const useClick = onClick => {
  const ref = useRef();

  useEffect(() => {
    // ComponentDidMount
    if (ref.current) {
      ref.current.addEventListener("click", onClick);
      console.log("ref.current addEvent");
    }
    // ComponentWillUnMount
    // 등록한 이벤트는 unMount일때, 지워줄 필요가 있다.
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", onClick);
        console.log("ref.current removeEvent");
      }
    };
  }, []);

  if (typeof onClick !== "function") {
    return;
  }
  return ref;
};
const useFetch = () => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return ref;
};
export default () => {
  const onClick = data => console.log("SayHello: ", data);
  const h3Ref = useClick(onClick);
  const inputRef = useFetch();

  return (
    <div>
      <h2>useClick</h2>
      <h3 ref={h3Ref}>Click!</h3>
      <input type="text" ref={inputRef} placeholder={"will focus"} />
    </div>
  );
};
// ex - 1
// const useFetch = () => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current.focus();
//   }, [ref]);

//   return ref;
// };
// export default () => {
//   const ref = useFetch();

//   return (
//     <div>
//       <h2>useClick</h2>
//       <input type={"text"} ref={ref} />
//     </div>
//   );
// };
