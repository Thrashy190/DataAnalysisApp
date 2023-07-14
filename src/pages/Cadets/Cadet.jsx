import { useParams } from "react-router-dom";
import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import CadetDataCard from "../../components/Users/Cards/CadetDataCard.jsx";
import { invoke } from "@tauri-apps/api/tauri";
import LineChart from "../../components/Users/Charts/LineChart.jsx";

const Cadet = () => {
  const idCadet = useParams();

  const [cadet, setCadet] = useState({});

  useEffect(() => {
    fetchCadet().then(() => {});
  }, []);

  const fetchCadet = async () => {
    setCadet(await invoke("get_cadet", { identifier: idCadet.id }));
  };
  const labels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60,
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Dia 1",
        data: [
          30, 40, 55, 53, 20, 80, 19, 20, 30, 40, 30, 40, 55, 53, 20, 80, 19,
          20, 30, 40, 30, 40, 55, 53, 20, 80, 19, 20, 30, 40, 30, 40, 55, 53,
          20, 80, 19, 20, 30, 40, 30, 40, 55, 53, 20, 80, 19, 20, 30, 40, 30,
          40, 55, 53, 20, 80, 19, 20, 30, 40,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dia 2",
        data: [
          50, 10, 15, 13, 50, 60, 10, 50, 10, 15, 50, 10, 15, 13, 50, 60, 10,
          50, 10, 15, 50, 10, 15, 13, 50, 60, 10, 50, 10, 15, 50, 10, 15, 13,
          50, 60, 10, 50, 10, 15, 50, 10, 15, 13, 50, 60, 10, 50, 10, 15, 50,
          10, 15, 13, 50, 60, 10, 50, 10, 15,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dia 3",
        data: [
          30, 40, 90, 20, 10, 40, 30, 21, 50, 10, 30, 40, 90, 20, 10, 40, 30,
          21, 50, 10, 30, 40, 90, 20, 10, 40, 30, 21, 50, 10, 30, 40, 90, 20,
          10, 40, 30, 21, 50, 10, 30, 40, 90, 20, 10, 40, 30, 21, 50, 10, 30,
          40, 90, 20, 10, 40, 30, 21, 50, 10,
        ],
        borderColor: "rgb(38,172,34)",
        backgroundColor: "rgba(38,172,34, 0.5)",
      },
    ],
  };
  const dataStress = {
    labels,
    datasets: [
      {
        label: "Dia 1",
        data: [
          0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1,
          0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0,
          1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dia 2",
        data: [
          1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0,
          0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0,
          1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <CContainer className="pb-5">
      <CadetDataCard cadet={cadet} />
      <LineChart title={"EmotiBit LineChart"} data={data} />
      <LineChart title={"Estres LineChart"} data={dataStress} />
    </CContainer>
  );
};

export default Cadet;
