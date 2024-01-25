import React from "react";
import "../Directory.css";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const nav = useNavigate()
  return (
    <div className="directory-container sign-in-page-container">
      <div className="logo">
        <img src="/src/assets/fktnm.jpg" alt="" />
      </div>
      <div className="flexColCenter innerWidth input-container">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
                <input
          type="confirm-password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flexColCenter button-container">
        <button onClick={() => nav("/")} className="sign-in-page button">
          Sign Up
        </button>
      </div>
      <p>Sign in with Google</p>
      <div className="flexCenter google-logo">
        <img src="/src/assets/google.svg" alt="Google Logo" />
      </div>
      <Link to = {"/en/sign-in"} className="create-an-account">Already have an account?</Link>
    </div>
  );
};

export default SignUp;
