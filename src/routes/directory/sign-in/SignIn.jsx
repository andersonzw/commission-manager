import React, { useState } from "react";
import "../Directory.css";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../../util/firebase/firebase.utils";
import { fetchList } from "../../../util/util-functions";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../util/store/userSlice";
import { fetchCommissionList } from "../../../util/store/commissionSlice";

import {
  selectGlobalLoad,
  setLoading,
} from "../../../util/store/globalLoadSlice";
import GoogleSignInButton from "../../../components/google-sign-in-button/GoogleSignIn";
const SignIn = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  handle sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const userCredential = await signInUser(email, password);

      // use usercredential to fetch and dispatch commission list
      const comList = await fetchList(userCredential.user.uid);
      dispatch(fetchCommissionList(comList));
      nav("/");
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      alert(error.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <section className="flexCenter auth-section">
        <div className="directory-container sign-in-page-container">
          <div className="logo">
            <img src="/fktnm.jpg" alt="" />
          </div>
          <form className="innerWidth" onSubmit={handleSubmit}>
            <div className="flexColCenter innerWidth input-container">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flexColCenter button-container">
              <button className="sign-in-page button">Sign In</button>
            </div>
          </form>
          <GoogleSignInButton />
          <Link to={"/en/sign-up"} className="create-an-account">
            Create an account
          </Link>
        </div>
      </section>
    </>
  );
};

export default SignIn;
