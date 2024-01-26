import React from "react";
import "./Directory.css";
import { useNavigate } from "react-router-dom";
const Directory = () => {
  const nav = useNavigate();
  return (
    <section className="flexCenter auth-section">
      <div className="directory-container">
        <div className="logo">
          <img src="/src/assets/fktnm.jpg" alt="" />
        </div>
        <div className="flexColCenter button-container">
          <button onClick={() => nav("/en/sign-up")} className="sign-up button">
            Create an account
          </button>
          <button onClick={() => nav("/en/sign-in")} className="sign-in button">
            Sign in
          </button>
        </div>
        <p>Sign in with Google</p>
        <div className="flexCenter google-logo">
          <img src="/src/assets/google.svg" alt="Google Logo" />
        </div>
      </div>
    </section>
  );
};

export default Directory;
