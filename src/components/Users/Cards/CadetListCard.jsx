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
import { useNavigate } from "react-router-dom";

const CadetListCard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      identifier: "FGd123",
      createdAt: "23/23/23",
    },
    {
      id: 2,
      identifier: "FGd123",
      createdAt: "23/23/23",
    },
    {
      id: 3,
      identifier: "FGd123",
      createdAt: "23/23/23",
    },
  ]);

  const handleCadetData = (id) => {
    navigate(`/dashboard/cadets/${id}`);
  };

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
                  <CButton
                    color="primary"
                    variant="outline"
                    onClick={() => handleCadetData(user.id)}
                  >
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
