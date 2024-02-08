import "./App.css";
import AddCommission from "./routes/add-commission/AddCommission";
import Sidebar from "./routes/sidebar/Sidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import About from "./routes/about/About";
import Commissions from "./routes/commission-page/Commission";
import ConfirmContextLayout from "./util/context/ConfirmContextLayout";
import Directory from "./routes/directory/Directory";
import SignIn from "./routes/directory/sign-in/SignIn";
import SignUp from "./routes/directory/sign-up/SignUp";
import Header from "./routes/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "./util/store/userSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./util/firebase/firebase.utils";
import { setCurrentActiveTab } from "./util/store/activeTabSlice";
import EditCommission from "./routes/edit-commission/EditCommission";
import ThemeContextLayout from "./util/context/ThemeContextLayout";
import { Box, LinearProgress } from "@mui/material";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const signedIn = useSelector(selectCurrentUser);
  // Auth state change listener
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      // if user exists
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return listen;
  }, []);

  // Determine current active tab
  useEffect(() => {
    const divId = location.pathname.split("/");
    let editMode = false;
    let currentTab = divId[divId.length - 1];
    if (currentTab === "edit") {
      currentTab = divId[divId.length - 2];
      editMode = true;
    }
    dispatch(
      setCurrentActiveTab({ currentTab: currentTab, editMode: editMode })
    );
    console.log("active tab is:", currentTab, editMode);
  }, [location, dispatch]);
  return (
    <div className=" App">
      <Routes>
        <Route element={<ThemeContextLayout />}>
          <Route path="/en" element={<Directory />} />

          <Route path="/en/sign-in" element={<SignIn />} />

          <Route path="/en/sign-up" element={<SignUp />} />

          <Route
            path="/"
            element={signedIn ? <Header /> : <Navigate to="/en" replace />}
          >
            {/* outlet */}
            <Route path="/" element={<Sidebar />}>
              {/* outlet */}
              <Route index element={<AddCommission />} />
              <Route path="about" element={<About />} />
              <Route element={<ConfirmContextLayout />}>
                <Route path="/commission/:comId" element={<Commissions />} />
                <Route
                  path="/commission/:comId/edit"
                  element={<EditCommission />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
