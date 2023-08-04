import { useParams } from "react-router-dom";
import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import CadetDataCard from "../../components/Users/Cards/CadetDataCard.jsx";
import { invoke } from "@tauri-apps/api/tauri";
import LineChart from "../../components/Users/Charts/LineChart.jsx";
import LinearProgress from "@mui/material/LinearProgress";
import processData from "../../config/process.json";

const Cadet = () => {
  const idCadet = useParams();

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
          {cadet.stress && <LineChart info={cadet.stress} name="Estres" />}
          {cadet.hearth_rythm && (
            <LineChart info={cadet.hearth_rythm} name="Ritmo cardiaco" />
          )}
        </div>
      )}
    </CContainer>
  );
};

export default Cadet;
