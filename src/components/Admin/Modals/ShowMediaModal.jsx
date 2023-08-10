import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { convertFileSrc } from "@tauri-apps/api/tauri";

const ShowMediaModal = ({ visibleCreate, setVisibleCreate, data }) => {
  return (
    <CModal
      alignment="center"
      visible={visibleCreate}
      onClose={() => setVisibleCreate(false)}
    >
      <CModalHeader onClose={() => setVisibleCreate(false)}>
        <CModalTitle>{data.name}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {data.name.includes(".mp4") ? (
          <video src={convertFileSrc(data.path)} controls />
        ) : (
          <img src={convertFileSrc(data.path)} alt={data.name} />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          variant="outline"
          onClick={() => setVisibleCreate(false)}
        >
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ShowMediaModal;
