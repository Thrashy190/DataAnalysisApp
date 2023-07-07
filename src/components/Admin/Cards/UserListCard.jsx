import React, { useState } from "react";
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

const UserListCard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      identifier: "FGd123",
      createdAt: "23/23/23",
    },
  ]);

  //useEffect(() => {
  //fetchUsers()
  //}, [])

  //const fetchUsers = async () => {
  //try {
  //const response = await axios.get('https://myapi.com/users')
  //setUsers(response.data)
  //} catch (error) {
  //console.error(error)
  //}
  //}

  //const handleDelete = async (id) => {
  //try {
  //await axios.delete(`https://myapi.com/users/${id}`)
  //fetchUsers()
  //} catch (error) {
  //console.error(error)
  //}
  // }

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
              <CTableHeaderCell>Fecha de creacion</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.id}>
                <td>{user.identifier}</td>
                <td>{user.createdAt}</td>
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
