import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VendorSelect from "./Pages/Vendors/VendorSelect";
import Confirm from "./Pages/Auth/Confirm";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./Pages/Dashboard/Home";
import Organizations from "./Pages/Dashboard/Organizations";
import Mail from "./Pages/Dashboard/Mail";
import Settings from "./Pages/Dashboard/Settings";
import Test from "./Pages/Dashboard/Test";
//import Invoices from "./Pages/Dashboard/Invoices";
import Quotes from "./Pages/Dashboard/Quotes";
import ResetPassword from "./Pages/Auth/ResetPassword";
import NewPassword from "./Pages/Auth/NewPassword";
import Profiles from "./Pages/Dashboard/Profiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/confirm" element={<Confirm />}></Route>
      <Route path="/forgot-password" element={<ResetPassword />}></Route>
      <Route path="/new-password" element={<NewPassword />}></Route>

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
        path="/invoices"
        element={<Dashboard dashContent={<Test />} />}
      ></Route>
      <Route
        path="/quotes"
        element={<Dashboard dashContent={<Quotes />} />}
      ></Route>

      <Route
        path="/settings"
        element={<Dashboard dashContent={<Settings />} />}
      ></Route>
      <Route
        path="/profiles"
        element={<Dashboard dashContent={<Profiles />} />}
      ></Route>
    </Routes>
  );
}

export default App;
