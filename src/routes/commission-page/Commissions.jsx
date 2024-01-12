import { useSelector } from "react-redux";
import "./Commissions.css";
import { selectComList } from "../../util/store/commissionSlice";
import { useParams } from "react-router-dom";
const Commissions = () => {
  const { userId } = useParams();
  const commissionList = useSelector(selectComList);
  const commission = commissionList.filter((obj) => {
    return obj.id === userId;
  });
  const { id, name, price, description, date } = commission[0];
  console.log(commission);

  return (
    <section className=" commission-section">
      <div className="header">
        <h1>Request {userId}</h1>
        <h1>{date}</h1>
      </div>
      <div className="secondary-header">
        <h2 className="requester-name">{name}</h2>
        <div className="price">${price}</div>
      </div>
      <div className="description">{description}</div>
    </section>
  );
};

export default Commissions;
