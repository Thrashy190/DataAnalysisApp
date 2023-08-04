import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { unix_to_date } from "../../../utils/dateFormatter.js";
import CheckCreateUserModal from "../Modals/CheckCreateUserModal.jsx";
import Notification from "../../../helpers/Notifications.jsx";

const UserListCard = ({ users, setUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setUsers(await invoke("get_users"));
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Lista de Usuarios</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CTable striped responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Identificador</CTableHeaderCell>
              <CTableHeaderCell>Rol</CTableHeaderCell>
              <CTableHeaderCell>Fecha de creacion</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.identifier}>
                <td>{user.identifier}</td>
                <td>{user.role}</td>
                <td>{unix_to_date(user.create_at)}</td>
                <td>
                  <CButton color="primary" variant="outline">
                    Editar
                  </CButton>
                </td>
                <td>
                  <CButton color="danger" variant="outline">
                    Eliminar
                  </CButton>
                </td>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default UserListCard;
