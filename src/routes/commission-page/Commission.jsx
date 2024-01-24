import { useDispatch, useSelector } from "react-redux";
import "./Commission.css";
import {
  removeCommissionFromList,
  changeStatusToComplete,
  selectComList,
} from "../../util/store/commissionSlice";
import { useNavigate, useParams } from "react-router-dom";
import SimpleSlider from "../../components/slider/Slider";
import Confirm from "../../components/confirmation/Confirm";
import { useContext } from "react";
import { ConfirmContext } from "../../util/context/confirm.context";
const Commissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { confirmToggle, hideConfirmDialogue, displayConfirmDialogue } =
    useContext(ConfirmContext);
  const commissionList = useSelector(selectComList);
  const commission = commissionList.filter((obj) => {
    return obj.id === userId;
  });
  const { name, price, description, date, status, source, refImage } =
    commission[0];

  const handleRemove = () => {
    dispatch(removeCommissionFromList(userId));
    navigate("/");
    hideConfirmDialogue();
  };

  const handleCompleted = () => {
    dispatch(changeStatusToComplete(userId));
  };
  return (
    // userId = Id
    <section className=" commission-section">
      <div className="header">
        <h1>Request: {userId}</h1>
        <h1>{date}</h1>
        <div className={`status ${status}`}>
          <h3>{status}</h3>
        </div>
      </div>
      <div className="secondary-header">
        <h2 className="requester-name">Requester: {name}</h2>
        <span className="right">
  
          <p className="price">${price}</p>
          <p className="source">{source}</p>
        </span>
      </div>
      <div className="description">{description}</div>

      {refImage[0] && (
        <div className="slider-container">
          <h3>References</h3>
          <SimpleSlider>
            {refImage.map((image, i) => (
              <div key={i} className="image-container">
                <img className="ref-image" src={image} alt="" />
              </div>
            ))}
          </SimpleSlider>
        </div>
      )}
      <div className="button-container">
        <button onClick={() => displayConfirmDialogue()}>Remove</button>
        <button>Edit</button>

        {status !== "Completed" && (
          <button onClick={handleCompleted}>Completed</button>
        )}
      </div>
      {confirmToggle && <Confirm onClickFunction={handleRemove}></Confirm>}
    </section>
  );
};

export default Commissions;
