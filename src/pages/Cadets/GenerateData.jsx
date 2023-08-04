import { CCol, CContainer, CRow } from "@coreui/react";
import RegisterDataCard from "../../components/Users/Cards/RegisterDataCard.jsx";
import React, { useState } from "react";
import UploadDataFileCard from "../../components/Admin/Cards/UploadDataFileCard.jsx";
import processData from "../../config/process.json";
import UploadMediaFilesCard from "../../components/Admin/Cards/UploadMediaFilesCard.jsx";

const GenerateData = () => {
  const [cadetId, setCadetId] = useState("");
  const [cadet, setCadet] = useState(null);

  return (
    <CContainer className="pb-10">
      <RegisterDataCard
        cadetId={cadetId}
        setCadetId={setCadetId}
        setCadet={setCadet}
        cadet={cadet}
      />
      {cadet && (
        <CRow>
          <CCol xs={12} md={12}>
            <UploadDataFileCard
              identifier={cadetId}
              processData={processData}
            />
            <UploadMediaFilesCard identifier={cadetId} />
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};

export default GenerateData;
