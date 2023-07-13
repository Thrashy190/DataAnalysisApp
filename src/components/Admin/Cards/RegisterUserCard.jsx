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
import Notification from "../../../helpers/Notifications.jsx";
import { now_date_to_unix } from "../../../helpers/dateFormatter.js";

const RegisterUserCard = ({ users, setUsers }) => {
  const [canCreate, setCanCreate] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [formValues, setFormValues] = useState({
    identifier: "",
    password: "",
    role: "",
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
      password: "",
      role: "",
      create_at: "",
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
              <CFormSelect
                aria-label="Default select example"
                name="role"
                onChange={handleInputChange}
              >
                <option>Elige un rol</option>
                <option value="Analizador">Analizador</option>
                <option value="Lector">Lector</option>
                <option value="Operador">Operador</option>
                <option value="Admin">Administrador</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} md={4}>
              <CFormLabel>Contraseña</CFormLabel>
              <CFormInput
                type="text"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="pt-4 ">
            <CCol className="d-flex justify-content-end gap-4">
              <CButton
                disabled={canCreate}
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
      <CheckCreateUserModal
        formValues={formValues}
        setFormValues={setFormValues}
        visibleCreate={visibleCreate}
        setVisibleCreate={setVisibleCreate}
        setNotify={setNotify}
        users={users}
        setUsers={setUsers}
      />
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </CCard>
  );
};

export default RegisterUserCard;
