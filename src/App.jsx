import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VendorSelect from "./Pages/Vendors/VendorSelect";
import Confirm from "./Pages/Auth/Confirm";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./Pages/Dashboard/Pages/Home";
import Organizations from "./Pages/Dashboard/Pages/Organizations";
import Mail from "./Pages/Dashboard/Pages/Mail";
import Report from "./Pages/Dashboard/Pages/Report";
import Settings from "./Pages/Dashboard/Pages/Settings";
import Profiles from "./Pages/Dashboard/Pages/Profiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/confirm" element={<Confirm />}></Route>
      <Route path="/vendorgroup" element={<VendorSelect />}></Route>
      <Route
        path="/dashboard"
        element={<Dashboard dashContent={<Home />} />}
      ></Route>
      <Route
        path="/organizations"
        element={<Dashboard dashContent={<Organizations />} />}
      ></Route>
      <Route
        path="/mail"
        element={<Dashboard dashContent={<Mail />} />}
      ></Route>
      <Route
        path="/reports"
        element={<Dashboard dashContent={<Report />} />}
      ></Route>
      <Route
        path="/settings"
        element={<Dashboard dashContent={<Settings />} />}
      ></Route>
      <Route
        path="/profiles"
        element={<Dashboard dashContent={<Profiles />} />}
      ></Route>{" "}
    </Routes>
  );
}

export default App;
