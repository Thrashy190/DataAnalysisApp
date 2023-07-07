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

const CadetListCard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      identifier: "FGd123",
      createdAt: "23/23/23",
    },
  ]);

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Lista de Cadetes</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CTable striped responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Identificador</CTableHeaderCell>
              <CTableHeaderCell>Fecha de creacion</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.id}>
                <td>{user.identifier}</td>
                <td>{user.createdAt}</td>
                <td>
                  <CButton color="info" variant="outline">
                    Ver datos
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

export default CadetListCard;
