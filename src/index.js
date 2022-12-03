import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateYlOrBr, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import GetData from "./getData";

const GDPUrl =
  "https://gist.githubusercontent.com/Hao-191/1b05871531ce71a82d36be51bde6c11b/raw/2118f515ad09e3430da298e5d3575c404e36eb0a/GDPbyProvince.csv";
const GarbageUrl =
  "https://gist.githubusercontent.com/Hao-191/1b05871531ce71a82d36be51bde6c11b/raw/2118f515ad09e3430da298e5d3575c404e36eb0a/VolumeofGarbagebyProvince.csv";

function HeatMap() {
  const garbage = GetData.GETGarbage(GarbageUrl);

  // Control Year Status
  const [startYear, setStartYear] = React.useState("2011");
  const [endYear, setEndYear] = React.useState("2020");

  if (garbage === null || saturationRange === []) {
    return <pre>Loading...</pre>;
  }

  // Control range for each rows
  const saturationRange = [];

  const WIDTH = 500;
  const HEIGHT = 900;
  const margin = { top: 200, right: 40, bottom: 50, left: 110 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;

  // Get year range
  const YEARS = [
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
  ];

  const YEAR = YEARS.map((x) =>
    Number(x) >= startYear && Number(x) <= endYear ? x : null
  ).filter((element) => {
    return element !== null;
  });

  const PROVINCE = garbage.map((d) => d.Region);
  const xScale = Scales.band(YEAR, 0, width);
  const yScale = Scales.band(PROVINCE, 0, height);

  //const garbageValues = [];

  // Get the saturation of each province
  garbage.map((d) => {
    let max_value = 0;
    let min_value = 10000;
    Object.keys(d).map((element) => {
      if (YEAR.includes(element)) {
        const scaled_value = d[element];
        // get saturation range for each row
        if (scaled_value >= max_value) {
          max_value = scaled_value;
        }
        if (scaled_value <= min_value) {
          min_value = scaled_value;
        }
        //garbageValues.push(scaled_value); // scale the garbageValues
      }
    });
    saturationRange.push([min_value, max_value]);
  });

  const colorRange = [interpolateYlOrBr(0), interpolateYlOrBr(1)];

  // const colormap = Scales.colormapLiner(startRange, colorRange);
  // const colormap = Scales.colorDiverging(startRange, interpolateCividis);

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {garbage.map((d, index) => {
          return Object.keys(d).map((element) => {
            if (YEAR.includes(element)) {
              const colormap = Scales.colorSequential(
                saturationRange[index],
                interpolateYlOrBr
              );
              return (
                <Cell
                  key={element + d.Region}
                  dYear={element}
                  dRegion={d.Region}
                  xScale={xScale}
                  yScale={yScale}
                  color={colormap(d[element])}
                />
              );
            }
          });
        })}
        {YEAR.map((s) => {
          return (
            <g key={s} transform={`translate(${xScale(s) + 15},-8)rotate(60)`}>
              <text style={{ textAnchor: "end" }}>{s}</text>
            </g>
          );
        })}
        {PROVINCE.map((m) => {
          return (
            <text
              key={m}
              style={{ textAnchor: "end" }}
              x={-10}
              y={yScale(m) + 15}
            >
              {m}
            </text>
          );
        })}
      </g>
    </svg>
  );
}

ReactDOM.render(<HeatMap />, document.getElementById("root"));
