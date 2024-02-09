// sign in with google

import { useDispatch } from "react-redux";
import { fetchCommissionList } from "../../util/store/commissionSlice";
import { setLoading } from "../../util/store/globalLoadSlice";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../util/firebase/firebase.utils";
import { fetchList } from "../../util/util-functions";

const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleGoogleButton = async () => {
    try {
      dispatch(setLoading(true));
      const userCredential = await googleSignIn();
      // use usercredential to fetch and dispatch commission list
      const comList = await fetchList(userCredential.user.uid);
      dispatch(fetchCommissionList(comList));
      nav("/");
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <p>Sign in with Google</p>
      <div
        onClick={() => handleGoogleButton()}
        className="flexCenter google-logo"
      >
        <img src="/google.svg" alt="Google Logo" />
      </div>
    </>
  );
};

export default GoogleSignInButton;
