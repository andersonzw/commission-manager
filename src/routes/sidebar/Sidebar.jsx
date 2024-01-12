import { useSelector } from "react-redux";
import "./Sidebar.css";
import { selectComList } from "../../util/store/commissionSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const commissionList = useSelector(selectComList);
  const navigate = useNavigate();
  return (
    <>
      <section className="inner-paddings sidebar-section">
        <h1>Commission List</h1>
        <div>
          {commissionList.map((com, i) => (

              <Link to={`/commission/${com.id}`} className="commission-preview" key={i}>
                <span>{com.name}</span>
                <span>{com.date}</span>
                <span>${com.price}</span>
              </Link>

          ))}
        </div>
        <h1>Work in Progress</h1>
        <h1>Completed</h1>
        <h1>Not Accepted</h1>
        <h1>Terminated</h1>
        <button onClick={() => navigate("/")}>Add Commission</button>
      </section>
      <Outlet />
    </>
  );
};

export default Sidebar;
