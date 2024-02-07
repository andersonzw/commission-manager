import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentActiveTab } from "../../util/store/activeTabSlice";

const SideBarComCard = ({ com, today }) => {
  const {currentTab, editMode} = useSelector(selectCurrentActiveTab);
  // const editingTab = useSelector(selectCurrentEditingTab)
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/commission/${com.id}`);
  };
  return (
    <div
      onClick={(e) => {
        handleClick(e);
      }}
      className={`sidebar-com-card ${
        currentTab === com.id ? "active" : ""
      } ${editMode === true ? "editing" : ""}`}
    >
      <div>
        <span>Request ID: {com.id}</span> <span> ${com.price}</span>
      </div>
      {com.status !== "Completed" ? (
        <span>
          Due in:{" "}
          {Math.floor((new Date(com.date) - today) / (1000 * 60 * 60 * 24))}{" "}
          days
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default SideBarComCard;
