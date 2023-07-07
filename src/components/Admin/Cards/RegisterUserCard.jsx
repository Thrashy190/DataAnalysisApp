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
  CFormSelect,
  CRow,
} from "@coreui/react";
import CheckCreateUserModal from "../Modals/CheckCreateUserModal.jsx";

const RegisterUserCard = () => {
  const [visibleCreate, setVisibleCreate] = useState(false);

  const [formValues, setFormValues] = useState({
    identifier: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClear = () => {
    setFormValues({
      identifier: "",
      password: "",
    });
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle className="pt-2">Agregar Usuario</CCardTitle>
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
              <CFormLabel>Rol</CFormLabel>
              <CFormSelect aria-label="Default select example">
                <option>Elige un rol</option>
                <option value="1">One</option>
                <option value="2">Two</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} md={4}>
              <CFormLabel>Contraseña</CFormLabel>
              <CFormInput
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="pt-4 ">
            <CCol className="d-flex justify-content-end gap-4">
              <CButton
                disabled={
                  formValues.password === "" && formValues.identifier === ""
                }
                variant="outline"
                color="primary"
                className="mr-2"
                onClick={() => setVisibleCreate(!visibleCreate)}
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
      <CheckCreateUserModal
        user={formValues}
        visibleCreate={visibleCreate}
        setVisibleCreate={setVisibleCreate}
      />
    </CCard>
  );
};

export default RegisterUserCard;
