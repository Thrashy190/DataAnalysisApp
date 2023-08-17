import React from "react";
import Plot from "react-plotly.js";
import { Line } from "react-chartjs-2";
import { CCard, CCardBody, CCardHeader, CCardTitle } from "@coreui/react";
import { unix_to_date } from "../../../utils/dateFormatter.js";

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

function LinePlot({ info, name }) {
  const datasets = info.map((data, index) => {
    return {
      name: unix_to_date(data.date),
      x: data.time,
      y: data.data,
      mode: "lines+markers",
      marker: {
        color: `rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`,
      },
    };
  });

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="text-lg font-semibold pt-2">{name}</CCardTitle>
      </CCardHeader>

      <Plot data={datasets} useResizeHandler layout={{ autosize: true }} />
    </CCard>
  );
}

export default LinePlot;
