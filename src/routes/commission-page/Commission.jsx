import { useDispatch, useSelector } from "react-redux";
import "./Commission.css";
import {

  changeStatusToComplete,

  fetchCommissionList,
} from "../../util/store/commissionSlice";
import {useNavigate, useParams } from "react-router-dom";
import SimpleSlider from "../../components/slider/Slider";
import Confirm from "../../components/confirmation/Confirm";
import { useContext, useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState({});
  // Upon page load, fetch commission
  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        const commissionList = await fetchList(user.uid);
        const commission = commissionList.filter((obj) => {
          return obj.id === comId;
        });
        setPageContent(commission[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadPage();
    console.log("pageLoaded (state not yet updated):", pageContent);
  }, [comId]);

  useEffect(() => {
    console.log("Page updated, state updated:", pageContent);
  }, [pageContent]);

  const { name, price, description, date, status, source, refImage, added } =
    pageContent;

  const deleteCommission = async () => {
    try {
      await deleteComObject(`users/${user.uid}/commissionList`, pageContent);
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

  if (loading) return <div className=" commission-section">Loading...</div>;
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
        {/* {refImage !== "" && (
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
        )} */}
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
