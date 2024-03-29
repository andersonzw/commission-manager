import React from "react";
import "./Header.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../util/store/userSlice";
import { signOutUser } from "../../util/firebase/firebase.utils";
import resetPersistedState from "../../util/store/ResetPersistedState";
const Header = () => {
  const nav = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log("signed out");
      resetPersistedState();
      nav("/en");
    } catch (error) {
      console.log("Error signing out:", error.message);
    }
  };
  return (
    <>
      <div className="header-section">
        <div className="header-logo">
          <img src="/fktnm.jpg" alt="logo" />
        </div>
        <div className="flexCenter user-icon-container">
          {currentUser ? currentUser.email : "guest"}
          <button onClick={() => handleSignOut()}>sign out</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
