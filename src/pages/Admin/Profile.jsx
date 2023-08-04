import { CButton, CContainer } from "@coreui/react";
import React from "react";
import { useAuth } from "../../context/AuthProvider.jsx";

const Profile = () => {
  const { logOut } = useAuth();

  return (
    <CContainer>
      <CButton
        variant="outline"
        color="primary"
        className="mr-2"
        onClick={() => {
          logOut();
        }}
      >
        Cerrar sesion
      </CButton>
    </CContainer>
  );
};

export default Profile;
