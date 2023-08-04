import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCard, CCardBody, CImage } from "@coreui/react";
import { useAuth } from "../../context/AuthProvider.jsx";

import cinvestavLogo from "../../assets/logo_cinvestav_blanco.png";

const Login = () => {
  const [userData, setUserData] = useState({});

  const { login } = useAuth();

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#EBEDEF] min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <CCard className="w-96">
          {/*header*/}
          <div className="flex justify-center items-center bg-[#1E2A31] h-40 py-10">
            <CImage src={cinvestavLogo} width={120} height={120} />
          </div>
          <CCardBody className="">
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            </div>
            <form>
              <div className="mb-4">
                <TextField
                  name="identifier"
                  label="Usuario"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={handleData}
                />
              </div>
              <div className="mb-4">
                <TextField
                  name="password"
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  fullWidth
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-center items-center">
                <CButton
                  className="w-full"
                  variant="outline"
                  color="primary"
                  onClick={() => {
                    login(userData);
                  }}
                >
                  Entrar
                </CButton>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default Login;
