import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useNavigate } from "react-router-dom";
import { CFormInput, CForm } from "@coreui/react";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [message, setMessage] = useState("");

  async function greet() {
    setMessage(await invoke("login", userData));
  }

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#EBEDEF] h-screen">
      <div>Login</div>
      <TextField
        id="user"
        name="user"
        label="Usuario"
        variant="outlined"
        type="text"
        onChange={handleData}
      />
      <TextField
        id="password"
        name="password"
        label="Contraseña"
        variant="outlined"
        type="password"
        onChange={handleData}
      />
      {message}
      <Button
        onClick={() => {
          navigate("/dashboard/cadets");
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
