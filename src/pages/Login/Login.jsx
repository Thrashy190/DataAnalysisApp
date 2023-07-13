import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

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
