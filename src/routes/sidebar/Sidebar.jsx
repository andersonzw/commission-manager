import { useSelector } from "react-redux";
import "./Sidebar.css";
import { selectComList } from "../../util/store/commissionSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import resetPersistedState from "../../util/store/ResetPersistedState";
import { useEffect } from "react";

const Sidebar = () => {
  const commissionList = useSelector(selectComList);

  // Sort commission list by due dates
  const sortedcommissionList = [...commissionList].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const navigate = useNavigate();
  return (
    <div className="sidebar-outlet">
      <section className="sidebar-section">
        <h1>Commission List</h1>
        <div className="commission-list">
          {sortedcommissionList.map((com, i) => (
            <div key={i} className="sidebar-com-card">
              <div>
                <span>Request ID: {com.id}</span> <span> ${com.price}</span>
              </div>
              <span>Due: {com.date}</span>
            </div>
            // <Link
            //   to={`/commission/${com.id}`}
            //   className="commission-preview"
            //   key={i}
            // >
            //   <span>{com.name}</span>
            //   <span>{com.date}</span>
            //   <span>${com.price}</span>
            // </Link>
          ))}
        </div>
        <h1>Work in Progress</h1>
        <h1>Completed</h1>
        <h1>Not Accepted</h1>
        <button onClick={() => navigate("/")}>Add Commission</button>
        <button onClick={() => resetPersistedState()}> RESET STATE</button>
      </section>
      <Outlet />
    </div>
  );
};

export default Sidebar;
