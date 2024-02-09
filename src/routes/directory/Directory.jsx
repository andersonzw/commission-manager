import React from "react";
import "./Directory.css";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../../components/google-sign-in-button/GoogleSignIn";
const Directory = () => {
  const nav = useNavigate();
  return (
    <section className="flexCenter auth-section">
      <div className="directory-container">
        <div className="logo">
          <img src="/fktnm.jpg" alt="" />
        </div>
        <div className="flexColCenter button-container">
          <button onClick={() => nav("/en/sign-up")} className="sign-up button">
            Create an account
          </button>
          <button onClick={() => nav("/en/sign-in")} className="sign-in button">
            Sign in
          </button>
        </div>
        <GoogleSignInButton />
      </div>
    </section>
  );
};

export default Directory;
