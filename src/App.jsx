import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Login from "../src/pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Users from "./pages/Admin/Users.jsx";
import Cadets from "./pages/Cadets/Cadets.jsx";
import GenerateData from "./pages/Cadets/GenerateData.jsx";
import AddCadet from "./pages/Cadets/AddCadet.jsx";
import GenerateInputs from "./pages/Admin/GenerateInputs.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="start" element={<Dashboard />} />
          <Route path="cadets" element={<Cadets />}>
            <Route path=":id" element={<Dashboard />} />
          </Route>
          <Route path="processData" element={<GenerateData />} />
          <Route path="addCadet" element={<AddCadet />} />
          <Route path="manageUsers" element={<Users />} />
          {/* <Route path="manageInputs" element={<GenerateInputs />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
