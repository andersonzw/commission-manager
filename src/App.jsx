import "./App.css";
import AddCommission from "./routes/add-commission/AddCommission";
import Sidebar from "./routes/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import About from "./routes/about/About";
import Commissions from "./routes/commission-page/Commission";
import { ConfirmProvider } from "./util/context/confirm.context";
import ConfirmContextLayout from "./util/context/ConfirmContextLayout";
import Directory from "./routes/directory/Directory";

function App() {
  return (
    <div className="paddings App">
      <Routes>
        <Route path="/en" element={<Directory/>}/>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<AddCommission />} />
          <Route path="about" element={<About />} />
          <Route element={<ConfirmContextLayout/>}>
            <Route path="/commission/:userId" element={<Commissions />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
