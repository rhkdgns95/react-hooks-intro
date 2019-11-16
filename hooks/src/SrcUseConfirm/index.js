import React from "react";

const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (!onCancel || typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

export default () => {
  const actionFn = () => console.log("Say Cohfirm Hello!!");
  const rejectFn = () => console.log("Say Reject");
  const message = "Are you sure ? ";

  const action = useConfirm(message, actionFn, rejectFn);

  return (
    <div>
      <h2>use Confirm</h2>
      <button onClick={action}>Confirm</button>
    </div>
  );
};
