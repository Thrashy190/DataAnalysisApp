import { CButton, CButtonGroup, CCol, CContainer, CRow } from "@coreui/react";
import RegisterDataCard from "../../components/Users/Cards/RegisterDataCard.jsx";
import React, { useState } from "react";
import UploadDataFileCard from "../../components/Users/Cards/UploadDataFileCard.jsx";
import processData from "../../config/process.json";
import UploadMediaFilesCard from "../../components/Users/Cards/UploadMediaFilesCard.jsx";
import UploadTextFilesCard from "../../components/Users/Cards/UploadTextFilesCard.jsx";

const GenerateData = () => {
  const [cadetId, setCadetId] = useState("");
  const [cadet, setCadet] = useState(null);
  const [type, setType] = useState("data");

  return (
    <CContainer className="pb-10">
      <RegisterDataCard
        cadetId={cadetId}
        setCadetId={setCadetId}
        setCadet={setCadet}
        cadet={cadet}
      />
      {cadet && (
        <div>
          <CRow className="py-2 pt-3">
            <CCol xs={12} md={12}>
              <CButtonGroup role="group" aria-label="Basic outlined example">
                <CButton
                  onClick={() => {
                    setType("data");
                  }}
                  color="primary"
                  variant="outline"
                >
                  Archivo de informacion/datos
                </CButton>
                <CButton
                  onClick={() => {
                    setType("multi");
                  }}
                  color="primary"
                  variant="outline"
                >
                  Archivos multimedia
                </CButton>
                <CButton
                  onClick={() => {
                    setType("text");
                  }}
                  color="primary"
                  variant="outline"
                >
                  Archivos de texto (notas)
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={12}>
              {type === "data" ? (
                <UploadDataFileCard
                  identifier={cadetId}
                  processData={processData}
                />
              ) : type === "multi" ? (
                <UploadMediaFilesCard identifier={cadetId} />
              ) : (
                <UploadTextFilesCard identifier={cadetId} />
              )}
            </CCol>
          </CRow>
        </div>
      )}
    </CContainer>
  );
};

export default GenerateData;
