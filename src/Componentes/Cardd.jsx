import { CCard, CCardBody, CButton } from "@coreui/react";

const CardData = () => {
  return (
    <CCard style={{ height: "12rem" }} className="bg-red-300 my-2">
      <CCardBody>This is some text within a card body.</CCardBody>
      <CButton color="primary">Primary</CButton>
    </CCard>
  );
};

export default CardData;
