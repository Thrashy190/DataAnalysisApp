import React, { useEffect, useState } from "react";
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
import { invoke } from "@tauri-apps/api/tauri";
import { unix_to_date } from "../../../utils/dateFormatter.js";

const RegisterDataCard = ({ cadetId, setCadetId, cadet, setCadet }) => {
  const [cadets, setCadets] = useState([]);

  useEffect(() => {
    fetchCadets();
  }, []);

  const fetchCadets = async () => {
    setCadets(await invoke("get_cadets"));
  };

  const fetchCadetData = async (id) => {
    setCadet(await invoke("get_cadet", { identifier: id }));
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">
          Agregar Archivos/evidencia del cadete
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol xs={12} md={12} className="flex justify-between">
              <div className="flex flex-row">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cadets}
                  inputValue={cadetId}
                  onInputChange={(event, newInputValue) => {
                    setCadetId(newInputValue);
                  }}
                  getOptionLabel={(option) => option.identifier}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Identificador" />
                  )}
                />
                <CButton
                  variant="outline"
                  color="primary"
                  className=" ml-2 px-10"
                  onClick={() => {
                    fetchCadetData(cadetId);
                  }}
                >
                  Buscar
                </CButton>
                <CButton
                  variant="outline"
                  color="primary"
                  className=" ml-2 px-10"
                  onClick={() => {
                    setCadet(null);
                  }}
                >
                  Limpiar campo
                </CButton>
              </div>
            </CCol>

            {cadet && (
              <div className="mt-10">
                <CRow>
                  <CCol xs={12} md={4}>
                    <h3 className="text-lg font-semibold">
                      Identificador del cadete:
                    </h3>
                    <div className="text-base">{cadet.identifier}</div>
                  </CCol>
                  <CCol xs={12} md={4}>
                    <h3 className="text-lg font-semibold">Estado civil: </h3>
                    <div className="text-base">{cadet.relationship}</div>
                  </CCol>
                  <CCol xs={12} md={4}>
                    <h3 className="text-lg font-semibold">Genero: </h3>
                    <div className="text-base">{cadet.genre}</div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} md={4}>
                    <h3 className="text-lg font-semibold">
                      Rango del cadete:{" "}
                    </h3>
                    <div className="text-base">{cadet.level}</div>
                  </CCol>
                  <CCol xs={12} md={4}>
                    <h3 className="text-lg font-semibold">Edad del cadete: </h3>
                    <div className="text-base">{cadet.birth}</div>
                  </CCol>
                  <CCol xs={12} md={4}>
                    <h3 className="text-lg font-semibold">
                      Rango del cadete:{" "}
                    </h3>
                    <div className="text-base">
                      {unix_to_date(cadet.create_at)}
                    </div>
                  </CCol>
                </CRow>
              </div>
            )}
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default RegisterDataCard;
