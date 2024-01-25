import React from "react";
import "./Header.css";
import { Outlet } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header-section">Header</div>
      <Outlet />
    </>
  );
};

export default Header;
