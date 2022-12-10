import React from "react";
import { max, min } from "d3";
import { Scales } from "../scale";
import { Points } from "./points";
import { XAxis, YAxis } from "./axes";
import * as d3shape from "d3-shape";
import Line from "./Line";

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

  const lineGenerator = d3shape
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value))
    .curve(d3shape.curveMonotoneX);

  return (
    <React.Fragment>
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
              {type === "Garbage" ? (
        <Line
          data={lineChart}
          xScale={xScale}
          yScale={yScale}
          lineGenerator={lineGenerator}          height={height}
          width={width}
        />
      ) 
      // : 
      // type === "GDP" ? (
      //   <Line
      //     data={lineChart}
      //     xScale={xScale}
      //     yScale={yScale}
      //     lineGenerator={lineGenerator}
      //     height={height}
      //     width={width}
      //   />
      // )
      // :
      // type === "Population" ?(
      //   <Line
      //     data={lineChart}
      //     xScale={xScale}
      //     yScale={yScale}
      //     lineGenerator={lineGenerator}
      //     height={height}
      //     width={width}
      //   />
      // )
      :
      null}
      </g>

    </React.Fragment>
  );
}
