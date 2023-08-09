import { useParams } from "react-router-dom";
import { CButton, CButtonGroup, CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import CadetDataCard from "../../components/Users/Cards/CadetDataCard.jsx";
import { invoke } from "@tauri-apps/api/tauri";
import LineChart from "../../components/Users/Charts/LineChart.jsx";
import LinearProgress from "@mui/material/LinearProgress";
import UploadMediaFilesCard from "../../components/Admin/Cards/UploadMediaFilesCard.jsx";

const Cadet = () => {
  const idCadet = useParams();
  const [type, setType] = useState("data");
  const [cadet, setCadet] = useState({
    stress: [{ time: [], data: [], date: "" }],
    hearth_rythm: [{ time: [], data: [], date: "" }],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCadet().then(() => {});
    setIsLoading(false);
  }, []);

  const fetchCadet = async () => {
    const cadet = await invoke("get_cadet", { identifier: idCadet.id });
    console.log(cadet);
    setCadet(cadet);
  };

  return (
    <CContainer className="pb-5">
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div>
          <CadetDataCard cadet={cadet} />
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
                    Graficas
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
                </CButtonGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={12} md={12}>
                {type === "data" ? (
                  <div>
                    {cadet.stress && (
                      <LineChart info={cadet.stress} name="Estres" />
                    )}
                    {cadet.hearth_rythm && (
                      <LineChart
                        info={cadet.hearth_rythm}
                        name="Ritmo cardiaco"
                      />
                    )}
                  </div>
                ) : (
                  <div>hola</div>
                )}
              </CCol>
            </CRow>
          </div>
        </div>
      )}
    </CContainer>
  );
};

export default Cadet;
