import React, { useRef, useEffect } from "react";

const useFadeIn = (duration = 1, delay = 1) => {
  const element = useRef();

  // useEffect === componentDidMount
  useEffect(() => {
    if (typeof duration !== "number" || typeof delay !== "number") {
      return;
    }
    if (element.current) {
      // element.current.style.opacity = 1;
      element.current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      element.current.style.opacity = "1";
    }
  }, []);

  return {
    ref: element,
    style: { opacity: 0 }
  };
};

export default () => {
  const fadeInH2 = useFadeIn();
  const fadeInP = useFadeIn(3, 2);

  return (
    <div>
      <h2 {...fadeInH2}>use FadeIn</h2>
      <p {...fadeInP}>Hello world! this is my contents</p>
    </div>
  );
};
