import React, { useState } from "react";
import "../Directory.css";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

import {signInUser } from "../../../util/firebase/firebase.utils";
const SignIn = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//  handle sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInUser(email, password)
      console.log(userCredential);
        nav('/')
    } catch (error) {
      console.log(error.message);
      setEmail('')
      setPassword('')
  
    }


  };

  return (
    <section className="flexCenter auth-section">
      <div className="directory-container sign-in-page-container">
        <div className="logo">
          <img src="/src/assets/fktnm.jpg" alt="" />
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
        <p>Sign in with Google</p>
        <div className="flexCenter google-logo">
          <img src="/src/assets/google.svg" alt="Google Logo" />
        </div>
        <Link to={"/en/sign-up"} className="create-an-account">
          Create an account
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
