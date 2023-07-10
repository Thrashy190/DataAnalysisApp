import { useParams } from "react-router-dom";
import { CContainer } from "@coreui/react";
import React from "react";

const Cadet = () => {
  const idCadet = useParams();
  return (
    <CContainer>
      <div>{idCadet.id}</div>
    </CContainer>
  );
};

export default Cadet;
