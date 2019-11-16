import React, { useState, useEffect, createRef, useRef } from "react";

const useScroll = () => {
  // createRef: (no-efficient) if re-rendering app continuously createRef !
  // 참고: https://stackoverflow.com/questions/54620698/whats-the-difference-between-useref-and-createref
  // const time = createRef();
  const time = useRef();
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0
  });
  const onScroll = event => {
    if (time.current) {
      clearTimeout(time.current);
    }
    time.current = setTimeout(() => {
      console.log("scrolling...");
      setScroll({
        y: window.scrollY
      });
    }, 200);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return scroll;
};

export default () => {
  const { y } = useScroll();
  const scrollH2 = y => {
    let color = "";
    if (y >= 500) {
      color = "red";
    } else if (y >= 250) {
      color = "blue";
    } else {
      color = "black";
    }
    return {
      color
    };
  };
  return (
    <div style={{ height: "1000vh" }}>
      <h2
        style={{
          position: "fixed",
          ...scrollH2(y)
        }}
      >
        use Scroll
      </h2>
    </div>
  );
};
