import React from "react";
import "./Header.css";
import { Outlet } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header-section">
        <div className="header-logo">
          <img src="/src/assets/fktnm.jpg" alt="logo" />
        </div>
        <div className="flexCenter user-icon-container">
          <div className="user-icon">
            
            <img src="/src/assets/user-icon.svg" alt="user icon" />
          </div>
          <img className="down-arrow" src="/src/assets/arrow-down.svg" alt="" />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
