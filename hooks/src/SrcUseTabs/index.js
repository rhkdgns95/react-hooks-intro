import React, { useState } from "react";

const Contents = [
  {
    title: "section - 1",
    data: "First Section is ....."
  },
  {
    title: "section - 2",
    data: "Second Section is ....."
  }
];
const useTabs = (initIndex, allContents) => {
  const [currentIndex, setCurrentIndex] = useState(initIndex);
  if (!allContents || !Array.isArray(allContents)) {
    return;
  }

  return {
    currentItem: allContents[currentIndex],
    onChangeIndex: setCurrentIndex
  };
};
export default () => {
  const { currentItem, onChangeIndex } = useTabs(0, Contents);
  return (
    <div>
      <h1>Use Tabs</h1>
      {Contents.map((content, key) => (
        <button key={key} onClick={e => onChangeIndex(key)}>
          {content.title}
        </button>
      ))}
      <p>{currentItem.data}</p>
    </div>
  );
};
