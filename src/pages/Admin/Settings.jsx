import { CButton, CContainer } from "@coreui/react";
import React from "react";
import { useAuth } from "../../context/AuthProvider.jsx";

const Settings = () => {
  const { logOut } = useAuth();

  return <CContainer></CContainer>;
};

export default Settings;
