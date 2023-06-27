import Sidebar from "../components/layout/Sidebar.jsx";
import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { CContainer } from "@coreui/react";
import Header from "../components/layout/Header.jsx";

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Outlet />
          </CContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
