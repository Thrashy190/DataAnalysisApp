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
        <div className="text-lg font-semibold">Identificador del cadete: </div>
        <p>{formValues.identifier}</p>
        <div className="text-lg font-semibold">Genero del cadete: </div>
        <p>{formValues.genre}</p>
        <div className="text-lg font-semibold">Estado civil: </div>
        <p>{formValues.relationship}</p>
        <div className="text-lg font-semibold">Rango del cadete: </div>
        <p>{formValues.level}</p>
        <div className="text-lg font-semibold">Edad del cadete: </div>
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
