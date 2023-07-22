import { useParams } from "react-router-dom";
import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import CadetDataCard from "../../components/Users/Cards/CadetDataCard.jsx";
import { invoke } from "@tauri-apps/api/tauri";
import LineChart from "../../components/Users/Charts/LineChart.jsx";
import LinearProgress from "@mui/material/LinearProgress";

const Cadet = () => {
  const idCadet = useParams();

  const [cadet, setCadet] = useState({ stats: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCadet().then(() => {});
    setIsLoading(false);
  }, []);

  const fetchCadet = async () => {
    setCadet(await invoke("get_cadet", { identifier: idCadet.id }));
  };

  return (
    <CContainer className="pb-5">
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div>
          <CadetDataCard cadet={cadet} />
          {cadet.stats &&
            cadet.stats.map((stat) => {
              return <LineChart stat={stat} />;
            })}
        </div>
      )}
    </CContainer>
  );
};

export default Cadet;
