import React from "react";
import "./Directory.css";
const Directory = () => {
  return (

      <div className="directory-container">
        <div className="logo">
          <img src="src/assets/fktnm.jpg" alt="" />
        </div>
        <div className="flexColCenter button-container">
          <button className=" sign-up button">Create an account</button>
          <button className="sign-in button">Sign in</button>
        </div>
        <p>Sign in with Google</p>
        <div className="google-logo">
          <img src="src/assets/google.svg" alt="Google Logo" />
        </div>
      </div>

  );
};

export default Directory;
