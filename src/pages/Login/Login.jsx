import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const Login = () => {
  const [userData, setUserData] = useState({});

  const [message, setMessage] = useState("");

  async function greet() {
    setMessage(await invoke("get_data", userData));
  }

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#EBEDEF] h-screen">
      <div>Login</div>
      <Button onClick={greet}>Ver info</Button>
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
    </div>
  );
};

export default Login;
