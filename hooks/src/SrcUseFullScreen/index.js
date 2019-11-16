import React, { useRef } from "react";

const useFullScreen = runCb => {
  const element = useRef();

  // web browser 호환성 체크해주도록 한다.
  const triggerFull = () => {
    if (element.current) {
      if (runCb && typeof runCb === "function") {
        if (element.current.requestFullscreen) {
          element.current.requestFullscreen();
        } else if (element.current.mozRequestFullscreen) {
          element.current.mozRequestFullscreen();
        } else if (element.current.webkitRequestFullscreen) {
          element.current.webkitRequestFullscreen();
        } else if (element.current.msRequestFullscreen) {
          element.current.msRequestFullScreen();
        }
        runCb(true);
      }
    }
  };
  const exitFullScreen = () => {
    if (element.current) {
      if (runCb && typeof runCb === "function") {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullscreen) {
          document.mozCancelFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.webkitExitFullscreen();
        }
        runCb(false);
      }
    }
  };
  return {
    element,
    triggerFull,
    exitFullScreen
  };
};
export default () => {
  const onFullS = isFull => {
    if (typeof isFull !== "boolean") {
      return;
    }
    console.log(`${isFull ? "We are full" : "we are small"}`);
  };
  const { element, triggerFull, exitFullScreen } = useFullScreen(onFullS);
  return (
    <div>
      <h2>use Full screen</h2>
      <div ref={element} style={{ height: "60vh" }}>
        <img
          style={{ width: "100%" }}
          alt={"wait..."}
          src={
            "https://as.ftcdn.net/r/v1/pics/346352852c40d9088b8626bdfb61601dc1ecd9de/home/open-in.webp"
          }
        />
        <button onClick={exitFullScreen}>Exit FullScreen</button>
      </div>
      <button onClick={triggerFull}>Trigger FullScreen</button>
    </div>
  );
};
