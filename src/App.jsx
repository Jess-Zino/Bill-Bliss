import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VendorSelect from "./Pages/Vendors/VendorSelect";
import Confirm from "./Pages/Auth/Confirm";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/confirm" element={<Confirm />}></Route>
      <Route path="/vendorgroup" element={<VendorSelect />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>


    </Routes>
  );
}

export default App;
