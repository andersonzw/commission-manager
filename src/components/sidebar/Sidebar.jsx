import { useSelector } from "react-redux";
import "./Sidebar.css";
import { selectComList } from "../../util/store/commissionSlice";
const Sidebar = () => {
  const commissionList = useSelector(selectComList);
  return (
    <section className="inner-paddings sidebar-section">
      <h1>Commission List</h1>
      <div>
        {commissionList.map((com, i) => (
          <div className = "commission-preview" key={i}>
            <span>{com.name}</span>
            <span>{com.deadline}</span>
            <span>{com.price}</span>
          </div>
        ))}
      </div>
      <h1>Work in Progress</h1>
      <h1>Completed</h1>
      <h1>Not Accepted</h1>
      <h1>Terminated</h1>
    </section>
  );
};

export default Sidebar;
