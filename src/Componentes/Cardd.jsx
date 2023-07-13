import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CBreadcrumb,
  CBreadcrumbItem,
} from "@coreui/react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CardData = () => {
  return (
    <div className="shadow-2xl">
      <CCard className="text-center" style={{ width: "22rem" }}>
        <CCardBody>
          <CCardTitle>Inicio de Sesión</CCardTitle>
          <CCardText>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
              />
              <TextField
                type="password"
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
              />
            </Box>
            <input type="checkbox" />
          </CCardText>
          <CButton href="#">Iniciar Sesión</CButton>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default CardData;
