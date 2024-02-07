import React, { useState } from "react";
import "../Directory.css";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../../util/firebase/firebase.utils";
import { fetchList } from "../../../util/util-functions";
import { useDispatch } from "react-redux";
import { fetchCommissionList } from "../../../util/store/commissionSlice";
const SignUp = () => {
  const dispatch = useDispatch()
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const userCredential = await signUpUser(
          formData.email,
          formData.password
        );
        console.log(userCredential);

        // use usercredential to fetch and dispatch commission list
        const comList = await fetchList(userCredential.user.uid);
        dispatch(fetchCommissionList(comList));
        nav("/");

      } catch (error) {
        console.log(error.message);
      }
    } else {
      return;
    }
  };
  return (
    <section className="auth-section flexCenter">
      <div className="directory-container sign-in-page-container">
        <div className="logo">
          <img src="/src/assets/fktnm.jpg" alt="" />
        </div>
        <form className="innerWidth" onSubmit={handleSignUp}>
          <div className="flexColCenter innerWidth input-container">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <div className="flexColCenter button-container">
            <button className="sign-in-page button">Sign Up</button>
          </div>
        </form>
        <p>Sign in with Google</p>
        <div className="flexCenter google-logo">
          <img src="/src/assets/google.svg" alt="Google Logo" />
        </div>
        <Link to={"/en/sign-in"} className="create-an-account">
          Already have an account?
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
