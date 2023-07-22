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
import { invoke } from "@tauri-apps/api/tauri";

const CheckCreateUserModal = ({
  visibleCreate,
  setVisibleCreate,
  formValues,
  setNotify,
  users,
  setUsers,
}) => {
  async function createUser() {
    let result = await invoke("create_user", { user: formValues })
      .then(() => {
        setUsers([formValues, ...users]);
        setNotify({
          isOpen: true,
          message: "Usuario creado correctamente",
          type: "success",
        });
        setVisibleCreate(false);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "Error al crear usuario o usuario ya existente",
          type: "error",
        });
        setVisibleCreate(false);
      });
  }

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
        <div className="text-lg font-semibold">Identificador del usuario: </div>
        <p>{formValues.identifier}</p>
        <div className="text-lg font-semibold">Rol del usuario: </div>
        <p>{formValues.role}</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          variant="outline"
          onClick={() => setVisibleCreate(false)}
        >
          Cerrar
        </CButton>
        <CButton color="primary" variant="outline" onClick={createUser}>
          Crear usuario
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default CheckCreateUserModal;
