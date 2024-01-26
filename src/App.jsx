import "./App.css";
import AddCommission from "./routes/add-commission/AddCommission";
import Sidebar from "./routes/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import About from "./routes/about/About";
import Commissions from "./routes/commission-page/Commission";
import { ConfirmProvider } from "./util/context/confirm.context";
import ConfirmContextLayout from "./util/context/ConfirmContextLayout";
import Directory from "./routes/directory/Directory";
import SignIn from "./routes/directory/sign-in/SignIn";
import SignUp from "./routes/directory/sign-up/SignUp";
import Header from "./routes/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "./util/store/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./util/firebase/firebase.utils";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
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
  return (
    <div className=" App">
      <Routes>
        <Route path="/en" element={<Directory />} />
        <Route path="/en/sign-in" element={<SignIn />} />
        <Route path="/en/sign-up" element={<SignUp />} />
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<AddCommission />} />
            <Route path="about" element={<About />} />
            <Route element={<ConfirmContextLayout />}>
              <Route path="/commission/:userId" element={<Commissions />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
