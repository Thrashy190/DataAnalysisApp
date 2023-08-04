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
import { unix_to_date } from "../../../utils/dateFormatter.js";

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
              <CTableHeaderCell>Genero</CTableHeaderCell>
              <CTableHeaderCell>Estado civil</CTableHeaderCell>
              <CTableHeaderCell>Rango</CTableHeaderCell>
              <CTableHeaderCell>Fecha de creacion</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {cadets.map((cadet) => (
              <CTableRow key={cadet.identifier} className="cursor-pointer">
                <td>{cadet.identifier}</td>
                <td>{cadet.genre}</td>
                <td>{cadet.relationship}</td>
                <td>{cadet.level}</td>
                <td>{unix_to_date(cadet.create_at)}</td>
                <td>
                  <CButton
                    color="primary"
                    variant="outline"
                    onClick={() => handleCadetData(cadet.identifier)}
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
