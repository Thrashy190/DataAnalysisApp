import React, { useState } from "react";
import {
  CButton,
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
}) => {
  async function createUser() {
    console.log(formValues);
    let result = await invoke("create_cadets", { cadet: formValues })
      .then(() => {
        setNotify({
          isOpen: true,
          message: "Cadete creado correctamente",
          type: "success",
        });
        setVisibleCreate(false);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err,
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
        <div>Identificador del cadete: </div>
        <p>{formValues.identifier}</p>
        <div>Nombre del cadete: </div>
        <p>{formValues.name}</p>
        <div>Rango del cadete: </div>
        <p>{formValues.level}</p>
        <div>Edad del cadete: </div>
        <p>{formValues.birth}</p>
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
