import React, { useState, useEffect } from "react";

const useTitle = initTitle => {
  const [title, setTitle] = useState(initTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = title;
  };

  useEffect(updateTitle, [title]);

  return setTitle;
};

export default () => {
  const updateTitle = useTitle("Loading...");
  setTimeout(() => updateTitle("Hello Title!"), 5000);
  return (
    <div>
      <h2>Update title after 5 seconds.</h2>
    </div>
  );
};
