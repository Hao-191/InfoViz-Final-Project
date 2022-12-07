import React from "react";
import { max, min } from "d3";
import { Scales } from "./scale";
import { Points } from "./points";
import { XAxis, YAxis } from "./axes";

export function ScatterPlot(props) {
  const {
    offsetX,
    offsetY,
    ChartData,
    province,
    height,
    width,
    startYear,
    selectedYear,
    type,
  } = props;

  console.log(type);

  const lineChart = [];
  const line = ChartData.filter((d) => {
    return d.Region === province;
  });

  Object.keys(line[0]).map((key) => {
    key >= Number(startYear) && key <= 2020
      ? lineChart.push({ year: key, value: line[0][key] })
      : null;
  });

  const xScale = Scales.linear(
    Number(startYear) - 1,
    Number(max(lineChart, (d) => d.year)),
    0,
    width
  );

  const yScale = Scales.linear(
    min(lineChart, (d) => d.value) - 20,
    max(lineChart, (d) => d.value),
    height,
    0
  );

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <Points
        lineChart={lineChart}
        xScale={xScale}
        yScale={yScale}
        selectedYear={selectedYear}
      />

      <YAxis
        yScale={yScale}
        height={height}
        axisLabel={
          type === "Garbage"
            ? "Volume of Garbage Deposit"
            : type === "Population"
            ? "Population"
            : type === "GDP"
            ? "Gross Region Product"
            : ""
        }
      />

      <XAxis
        chartType={"scatter"}
        xScale={xScale}
        height={height}
        width={width}
        axisLabel={"Year"}
      />
    </g>
  );
}
