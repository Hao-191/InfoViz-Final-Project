import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { min, max, interpolateYlOrBr } from "d3";
import { Scales } from "./scale";
import { Tooltip } from "./tooltip";
import GetData from "./getData";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const GDPUrl =
  "https://gist.githubusercontent.com/Hao-191/1b05871531ce71a82d36be51bde6c11b/raw/2118f515ad09e3430da298e5d3575c404e36eb0a/GDPbyProvince.csv";
const GarbageUrl =
  "https://gist.githubusercontent.com/Hao-191/1b05871531ce71a82d36be51bde6c11b/raw/2118f515ad09e3430da298e5d3575c404e36eb0a/VolumeofGarbagebyProvince.csv";

function HeatMap() {
  // Control Year Status
  const [startYear, setStartYear] = React.useState(2011);
  const [endYear, setEndYear] = React.useState(2020);

  // tooltip
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [tooltipLeft, setTooltipLeft] = React.useState(null);
  const [tooltipTop, setTooltipTop] = React.useState(null);

  const garbage = GetData.GETGarbage(GarbageUrl, startYear, endYear);
  const GDP = GetData.GetGDP(GDPUrl, startYear, endYear);

  // Load dataset
  if (garbage === null || saturationRange === []) {
    return <pre>Loading...</pre>;
  }

  // Load dataset
  if (GDP === null) {
    return <pre>Loading...</pre>;
  }

  //tooltip point filter
  const dTooltipGarbage = garbage.filter((d) => d.Region === selectedRegion)[0];
  const dTooltipGDP = GDP.filter((d) => d.Region === selectedRegion)[0];
  const WIDTH = ((endYear-startYear+1) * 40) + 150;
  const HEIGHT = 31 * 50;
  const margin = { top: 200, right: 40, bottom: 110, left: 110};
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

  // Control range for each rows
  const saturationRange = [];

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

  //console.log(saturationRange)

  //Assign a scale for each Provience
  const ProvScales = [];
  GDP.map((d) => {
    const temp = [];
    Object.keys(d).map((element) => {
      if (YEAR.includes(element)) {
        temp.push(d[element]);
      }
    })
    const sizeScale = Scales.linear(
      min(temp),
      max(temp),
      0,
      (width / YEAR.length) - 3
    );
    ProvScales.push(sizeScale);
  });

  //Give a size to each cell
  const cellSize = [];
  GDP.map((d, index) => {
    Object.keys(d).map((element) => {
      if (YEAR.includes(element)) {
        cellSize.push(ProvScales[index](d[element]));
      }
    });
  });

  const handleSelect = (e) => {
    e.preventDefault();
    let newStartYear = e.target.value;
    setStartYear(newStartYear);
  };

  return (
    <React.Fragment>
      {/* Past years selector */}
      <Box sx={{ maxWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Past Years</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={startYear}
            label="Year Range"
            onChange={handleSelect}
          >
            <MenuItem value={2016}>Past 5 Years</MenuItem>
            <MenuItem value={2011}>Past 10 Years</MenuItem>
            <MenuItem value={2006}>Past 15 Years</MenuItem>
            <MenuItem value={2004}>Past 17 Years</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${margin.left}, ${margin.top - 100})`}>
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
                    size={cellSize.shift()}
                    color={colormap(d[element])}
                    setSelectedRegion={setSelectedRegion}
                    setSelectedYear={setSelectedYear}
                    setTooltipLeft={setTooltipLeft}
                    setTooltipTop={setTooltipTop}
                  />
                );
              }
            });
          })}

          {YEAR.map((s) => {
            return (
              <g
                key={s}
                transform={`translate(${xScale(s)},-20)rotate(60)`}
              >
                <text style={{ textAnchor: "end" }}>{s}</text>
              </g>
            );
          })}

          {PROVINCE.map((m) => {
            return (
              <text
                key={m}
                style={{ textAnchor: "end" }}
                x={-9}
                y={yScale(m)+3}
              >
                {m}
              </text>
            );
          })}
        </g>
      </svg>
      <Tooltip
        garbageData={dTooltipGarbage}
        gdpData={dTooltipGDP}
        left={tooltipLeft}
        top={tooltipTop}
        year={selectedYear}
      ></Tooltip>
    </React.Fragment>
  );
}

ReactDOM.render(<HeatMap />, document.getElementById("root"));
