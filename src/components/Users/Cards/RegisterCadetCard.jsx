import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import Notification from "../../../helpers/Notifications.jsx";
import CheckCreateCadetModal from "../Modals/CheckCreateCadetModal.jsx";
import { now_date_to_unix } from "../../../helpers/dateFormatter.js";

const RegisterCadetCard = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [formValues, setFormValues] = useState({
    identifier: "",
    name: "",
    birth: "",
    level: "",
    create_at: "",
  });

  const openCheckModal = () => {
    setFormValues({ ...formValues, create_at: now_date_to_unix() });
    setVisibleCreate(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClear = () => {
    setFormValues({
      identifier: "",
      name: "",
      birth: "",
      level: "",
      create_at: "",
    });
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle className="pt-2">Agregar Cadete</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow>
            <CCol xs={12} md={4}>
              <CFormLabel>Identificador</CFormLabel>
              <CFormInput
                type="text"
                name="identifier"
                value={formValues.identifier}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol xs={12} md={4}>
              <CFormLabel>Nombre</CFormLabel>
              <CFormInput
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol xs={12} md={4}>
              <CFormLabel>Rango</CFormLabel>
              <CFormInput
                type="text"
                name="level"
                value={formValues.level}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={4}>
              <CFormLabel>Edad</CFormLabel>
              <CFormInput
                type="text"
                name="birth"
                value={formValues.birth}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="pt-4 ">
            <CCol className="d-flex justify-content-end gap-4">
              <CButton
                variant="outline"
                color="primary"
                className="mr-2"
                onClick={() => openCheckModal()}
              >
                Crear usuario
              </CButton>
              <CButton
                variant="outline"
                color="secondary"
                className="mr-2"
                onClick={() => handleClear()}
              >
                Limpiar campos
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
      <CheckCreateCadetModal
        formValues={formValues}
        visibleCreate={visibleCreate}
        setVisibleCreate={setVisibleCreate}
        setNotify={setNotify}
      />
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </CCard>
  );
};

export default RegisterCadetCard;
