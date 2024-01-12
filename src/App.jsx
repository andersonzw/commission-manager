import "./App.css";
import AddCommission from "./routes/add-commission/AddCommission";
import Sidebar from "./routes/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import About from "./routes/about/About"
import Commissions from "./routes/commission-page/Commissions";

function App() {
  return (
    <div className="paddings App">
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<AddCommission />} />
          <Route path = "about" element={<About/>}/>
          <Route path = "/commission/:userId" element={<Commissions/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
