import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import Notification from "../helpers/Notifications.jsx";
import { invoke } from "@tauri-apps/api/tauri";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const logOut = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const login = async (user) => {
    await invoke("login", user)
      .then((res) => {
        setCurrentUser(res);
        setNotify({
          isOpen: true,
          message: "Inicio sesion correctamente",
          type: "success",
        });
        navigate("dashboard/cadets");
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err,
          type: "error",
        });
      });

    //await invoke("login", user);
  };

  const values = {
    currentUser,
    login,
    logOut,
  };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </Fragment>
  );
};

export default AuthProvider;
