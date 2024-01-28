import React from "react";
import { useNavigate } from "react-router-dom";

const SideBarComCard = ({ com, today }) => {
    const nav = useNavigate()
  return (
    <div
      onClick={() => {
        nav(`/commission/${com.id}`);
      }}
      className="sidebar-com-card"
    >
      <div>
        <span>Request ID: {com.id}</span> <span> ${com.price}</span>
      </div>
      <span>
        Due in:{" "}
        {Math.floor((new Date(com.date) - today) / (1000 * 60 * 60 * 24))} days
      </span>
    </div>
  );
};

export default SideBarComCard;
