import { useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import React from "react";

const CadetDataCard = ({ cadet }) => {
  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Informacion de cadete</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs={12} md={4}>
            <h3 className="text-lg font-semibold">
              Identificador del cadete:{" "}
            </h3>
            <div className="text-base">{cadet.identifier}</div>
          </CCol>
          <CCol xs={12} md={4}>
            <h3 className="text-lg font-semibold">Nombre del cadete: </h3>
            <div className="text-base">{cadet.name}</div>
          </CCol>
          <CCol xs={12} md={4}>
            <h3 className="text-lg font-semibold">Rango del cadete: </h3>
            <div className="text-base">{cadet.level}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12} md={4}>
            <h3 className="text-lg font-semibold">Edad del cadete: </h3>
            <div className="text-base">{cadet.birth}</div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default CadetDataCard;
