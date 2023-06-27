import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Login from "../src/pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Users from "./pages/Users/Users.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="start" element={<Dashboard />} />
          <Route path="addUsers" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
