import { useDispatch, useSelector } from "react-redux";
import "./Commission.css";
import {
  removeCommissionFromList,
  changeStatusToComplete,
  selectComList,
  fetchCommissionList,
} from "../../util/store/commissionSlice";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import SimpleSlider from "../../components/slider/Slider";
import Confirm from "../../components/confirmation/Confirm";
import { useContext } from "react";
import { ConfirmContext } from "../../util/context/confirm.context";
import { deleteComObject } from "../../util/firebase/firebase.utils";
import { selectCurrentUser } from "../../util/store/userSlice";
import { fetchList } from "../../util/util-functions";
const Commissions = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { comId } = useParams();
  const { confirmToggle, hideConfirmDialogue, displayConfirmDialogue } =
    useContext(ConfirmContext);
  const commissionList = useSelector(selectComList);
  const commission = commissionList.filter((obj) => {
    return obj.id === comId;
  });

  const { name, price, description, date, status, source, refImage, added } =
    commission.length > 0 ? commission[0] : "";

  const deleteCommission = async () => {
    try {
      await deleteComObject(`users/${user.uid}/commissionList`, commission[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async () => {
    await deleteCommission();
    nav("/");
    const comList = await fetchList(user.uid);
    dispatch(fetchCommissionList(comList));
    hideConfirmDialogue();
  };

  const handleCompleted = () => {
    dispatch(changeStatusToComplete(userId));
  };

  if (name === "") return <div>Loading...</div>;
  return (
    // userId = Id
    <>
      <section className=" commission-section">
        <div className="header">
          <h1>Request: {comId}</h1>
          <h1>Due: {date}</h1>
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
        {refImage !== "" && (
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
        <p>Added: {added}</p>
        <div className="button-container">
          <button onClick={() => displayConfirmDialogue()}>Remove</button>
          <button onClick={() => nav(`/commission/${comId}/edit`)}>Edit</button>
          {status !== "Completed" && (
            <button onClick={handleCompleted}>Completed</button>
          )}
        </div>
        {confirmToggle && <Confirm onClickFunction={handleRemove}></Confirm>}
      </section>
    </>
  );
};

export default Commissions;
