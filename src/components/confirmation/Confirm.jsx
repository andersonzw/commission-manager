import React, { useContext } from "react";
import "./Confirm.css";
import { ConfirmContext } from "../../util/context/confirm.context";
const Confirm = ({ children, onClickFunction }) => {
  const { hideConfirmDialogue } = useContext(ConfirmContext);
  return (
    <div className="confirm-overlay">
      <div className="confirm-container">
        <div className="header">
          <span>Confirmation</span>
          <span onClick={() => hideConfirmDialogue()}>x</span>
        </div>
        <div className="text">Confirm Delete?</div>
        <div className="footer">
          <button onClick={() => onClickFunction()}>Yes</button>
          <button onClick={() => hideConfirmDialogue()}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
