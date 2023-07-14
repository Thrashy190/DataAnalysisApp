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
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";

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

function LineChart({ title, data }) {
  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="text-lg font-semibold pt-2">{title}</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <Line options={options} data={data} />
      </CCardBody>
    </CCard>
  );
}

export default LineChart;
