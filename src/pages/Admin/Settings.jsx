import { CButton, CContainer } from "@coreui/react";
import { TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <CContainer>
      <CButton
        variant="outline"
        color="primary"
        className="mr-2"
        onClick={() => {
          navigate("/");
        }}
      >
        Cerrar sesion
      </CButton>
    </CContainer>
  );
};

export default Settings;
