import React, { useState } from "react";

export const ConfirmContext = React.createContext({
  confirmToggle: false,
  setConfirmToggle: () => null,
});

export const ConfirmProvider = ({ children }) => {
  const [confirmToggle, setConfirmToggle] = useState(false);

  const displayConfirmDialogue = () => {

    setConfirmToggle(true);
    console.log(confirmToggle);
  };
  const hideConfirmDialogue = () => {
    setConfirmToggle(false);
  };
  const value = { confirmToggle, hideConfirmDialogue, displayConfirmDialogue };
  return (
    <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>
  );
};
