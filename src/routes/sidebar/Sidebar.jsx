import { useSelector } from "react-redux";
import "./Sidebar.css";
import { selectComList } from "../../util/store/commissionSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import resetPersistedState from "../../util/store/ResetPersistedState";
import { useEffect } from "react";
import SideBarComCard from "../../components/sidebar-com-card/SideBarComCard";

const Sidebar = () => {
  const commissionList = useSelector(selectComList);

  // Sort commission list by due dates
  const sortedcommissionList = [...commissionList].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const today = new Date();
  const nav = useNavigate();
  return (
    <div className="sidebar-outlet">
      <section className="sidebar-section">
        <h1>Commission List</h1>
        <div className="commission-list">
          {sortedcommissionList.map((com, i) => {
            if (com.status !== "Accepted/WIP") {
              return;
            } else {
              return <SideBarComCard com={com} today = {today} key = {i} />;
            }
          })}
        </div>
        <h1>Completed</h1>
        <div className="commission-list">
          {sortedcommissionList.map((com, i) => {
            if (com.status === "Accepted/WIP") {
              return;
            } else {
              return <SideBarComCard com={com} today = {today} key = {i} />;
            }
          })}
        </div>
        <button onClick={() => nav("/")}>Add Commission</button>
        <button onClick={() => resetPersistedState()}> RESET STATE</button>
      </section>
      <Outlet />
    </div>
  );
};

export default Sidebar;
