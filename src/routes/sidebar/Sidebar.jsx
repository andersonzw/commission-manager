import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import {
  addCommissionToList,
  fetchCommissionList,
  selectComList,
} from "../../util/store/commissionSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import resetPersistedState from "../../util/store/ResetPersistedState";
import SideBarComCard from "../../components/sidebar-com-card/SideBarComCard";
import { selectCurrentActiveTab } from "../../util/store/activeTabSlice";
import { useEffect } from "react";
import { selectCurrentUser } from "../../util/store/userSlice";
import { db } from "../../util/firebase/firebase.utils";
import { collection, getDocs, query } from "firebase/firestore";
import { fetchList } from "../../util/util-functions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const commissionList = useSelector(selectComList);

  // Sort commission list by due dates
  const sortedcommissionList = [...commissionList].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const today = new Date();
  const nav = useNavigate();
  const handleFetch = async () => {
    const comList = await fetchList(user.uid) 
    dispatch(fetchCommissionList(comList));

  };

  return (
    <div className="sidebar-outlet">
      <section className="sidebar-section">
        <h1>Commission List</h1>
        <div className="commission-list">
          {sortedcommissionList.map((com, i) => {
            if (com.status !== "Accepted/WIP") {
              return;
            } else {
              return <SideBarComCard com={com} today={today} key={i} />;
            }
          })}
        </div>
        <h1>Completed</h1>
        <div className="commission-list">
          {sortedcommissionList.map((com, i) => {
            if (com.status === "Accepted/WIP") {
              return;
            } else {
              return <SideBarComCard com={com} today={today} key={i} />;
            }
          })}
        </div>
        <button onClick={() => nav("/")}>Add Commission</button>
        <button onClick={() => resetPersistedState()}> RESET STATE</button>
        <button onClick={() => handleFetch()}>Fetch</button>
      </section>
      <Outlet />
    </div>
  );
};

export default Sidebar;
