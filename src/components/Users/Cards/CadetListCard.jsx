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
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";

const CadetListCard = () => {
  const navigate = useNavigate();
  const [cadets, setCadets] = useState([]);

  useEffect(() => {
    fetchCadets();
  }, []);

  const fetchCadets = async () => {
    setCadets(await invoke("get_cadets"));
  };

  const handleCadetData = (id) => {
    navigate(`/dashboard/cadets/${id}`);
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Lista de Cadetes</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CTable striped responsive hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Identificador</CTableHeaderCell>
              <CTableHeaderCell>Fecha de creacion</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {cadets.map((cadet) => (
              <CTableRow key={cadet.id} className="cursor-pointer">
                <td>{cadet.identifier}</td>
                <td>{cadet.create_at}</td>
                <td>
                  <CButton
                    color="primary"
                    variant="outline"
                    onClick={() => handleCadetData(cadet.id)}
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
