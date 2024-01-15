import { useDispatch, useSelector } from "react-redux";
import "./Commission.css";
import { removeCommissionFromList,changeStatusToComplete,  selectComList } from "../../util/store/commissionSlice";
import { useNavigate, useParams } from "react-router-dom";
const Commissions = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId } = useParams();
  const commissionList = useSelector(selectComList);
  const commission = commissionList.filter((obj) => {
    return obj.id === userId;
  });
  const { name, price, description, date, status } = commission[0];
  console.log(commission);

  const handleRemove = () => {
    dispatch(removeCommissionFromList(userId))
    navigate("/")
  }

  const handleCompleted = () =>{
    dispatch(changeStatusToComplete(userId))
  }
  return (
    // userId = Id
    <section className=" commission-section">
      <div className="header">
        <h1>Request {userId}</h1>
        <h1>{date}</h1>
        <div className={`status ${status}`}>
          <h3>{status}</h3>
        </div>
      </div>
      <div className="secondary-header">
        <h2 className="requester-name">{name}</h2>
        <div className="price">${price}</div>
      </div>
      <div className="description">{description}</div>

      <div className="button-container">
        <button onClick={handleRemove}>Remove</button>
        {status !== "Completed" && <button onClick={handleCompleted}>Completed</button>}
      </div>
    </section>
  );
};

export default Commissions;
