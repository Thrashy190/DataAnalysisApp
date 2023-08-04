import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CCard, CCardBody, CCardHeader, CCardTitle } from "@coreui/react";
import { unix_to_date } from "../../../utils/dateFormatter.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const colors = [
  [255, 99, 132],
  [54, 162, 235],
  [255, 206, 86],
  [75, 192, 192],
  [153, 102, 255],
  [255, 159, 64],
  [255, 99, 132],
  [54, 162, 235],
  [255, 206, 86],
];

function LineChart({ info, name }) {
  let labels = info[0].time;

  const datasets = info.map((data, index) => {
    if (labels.length < data.time.length) {
      labels = data.time;
    }

    return {
      label: unix_to_date(data.date),
      data: data.data,
      borderColor: `rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`,
      backgroundColor: `rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]},0.5)`,
    };
  });

  const data = {
    labels,
    datasets,
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="text-lg font-semibold pt-2">{name}</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <Line options={options} data={data} />
      </CCardBody>
    </CCard>
  );
}

export default LineChart;
