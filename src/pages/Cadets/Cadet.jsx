import { useParams } from "react-router-dom";
import { CButton, CButtonGroup, CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import CadetDataCard from "../../components/Users/Cards/CadetDataCard.jsx";
import { invoke } from "@tauri-apps/api/tauri";
import LinearProgress from "@mui/material/LinearProgress";
import CadetImageVideoCard from "../../components/Users/Cards/CadetImageVideoCard.jsx";
import CadetTextFileCard from "../../components/Users/Cards/CadetTextFileCard.jsx";
import processData from "../../config/process.json";
import LinePlot from "../../components/Users/Charts/LinePlot.jsx";

const Cadet = () => {
  const idCadet = useParams();
  const [type, setType] = useState("data");
  const [cadet, setCadet] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCadet().then(() => { });
    setIsLoading(false);
  }, []);

  const fetchCadet = async () => {
    const cadet = await invoke("get_cadet", { identifier: idCadet.id });
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
                  <CButton
                    onClick={() => {
                      setType("text");
                    }}
                    color="primary"
                    variant="outline"
                  >
                    Archivos de text
                  </CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={12} md={12}>
                {type === "data" ? (
                  <div>
                    {processData.map((process, index) => {
                      return (
                        cadet[process.title] && (
                          <LinePlot
                            key={index}
                            info={cadet[process.title]}
                            name={process.name}
                            text={process.text}
                          />
                        )
                      );
                    })}
                  </div>
                ) : type === "multi" ? (
                  <CadetImageVideoCard identifier={cadet.identifier} />
                ) : (
                  <CadetTextFileCard identifier={cadet.identifier} />
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
