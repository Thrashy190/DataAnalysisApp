import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CRow,
} from "@coreui/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const RegisterDataCard = () => {
  const data = [
    { label: "1vjwonodj", id: 1 },
    { label: "1vjwonwdj", id: 2 },
    { label: "1vwvnodj", id: 3 },
  ];

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Agregar Datos a cadete</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow className="flex justify-between">
            <CCol xs={12} md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Identificador" />
                )}
              />
            </CCol>
            <CCol xs={12} md={2}>
              <CButton variant="outline" color="primary" className="mr-2">
                Guardar datos
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default RegisterDataCard;
