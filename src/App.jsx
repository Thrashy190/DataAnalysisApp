import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login/Login.jsx";
import "./App.css";

function App() {
  //const [greetMsg, setGreetMsg] = useState("");
  //const [name, setName] = useState("");

  //async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //setGreetMsg(await invoke("greet", { name }));
  //}

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
