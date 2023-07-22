import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import Notification from "../helpers/Notifications.jsx";
import { invoke } from "@tauri-apps/api/tauri";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const login = async (user) => {
    console.log("login");
    await invoke("login", user);
  };

  const values = {
    currentUser,
    login,
  };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </Fragment>
  );
};

export default AuthProvider;
