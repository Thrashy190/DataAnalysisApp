import React, { useState } from "react";
import {
  CButton,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const CheckCreateUserModal = ({ visibleCreate, setVisibleCreate, user }) => {
  return (
    <CModal
      alignment="center"
      visible={visibleCreate}
      onClose={() => setVisibleCreate(false)}
    >
      <CModalHeader onClose={() => setVisibleCreate(false)}>
        <CModalTitle>Confirmar información</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>Identificador del usuario: </div>
        <p>{user.identifier}</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          variant="outline"
          onClick={() => setVisibleCreate(false)}
        >
          Cerrar
        </CButton>
        <CButton color="primary" variant="outline">
          Crear usuario
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default CheckCreateUserModal;
