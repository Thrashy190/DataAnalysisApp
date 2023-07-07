import React from "react";
import { CContainer } from "@coreui/react";
import RegisterUserCard from "../../components/Admin/Cards/RegisterUserCard.jsx";
import UserListCard from "../../components/Admin/Cards/UserListCard.jsx";
const Users = () => {
  return (
    <CContainer>
      <RegisterUserCard />
      <UserListCard />
    </CContainer>
  );
};

export default Users;
