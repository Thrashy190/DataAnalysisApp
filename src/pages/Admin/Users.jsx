import React, { useState } from "react";
import { CContainer } from "@coreui/react";
import RegisterUserCard from "../../components/Admin/Cards/RegisterUserCard.jsx";
import UserListCard from "../../components/Admin/Cards/UserListCard.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);

  return (
    <CContainer>
      <RegisterUserCard users={users} setUsers={setUsers} />
      <UserListCard users={users} setUsers={setUsers} />
    </CContainer>
  );
};

export default Users;
