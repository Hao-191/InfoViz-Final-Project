import React from "react";

export function Points(props) {
  const { lineChart, xScale, yScale, selectedYear } = props;

  const getColor = (selectedYear, year) => {
    if (year === selectedYear) {
      return "lightblue";
    } else {
      return "orange";
    }
  };
  const getRadius = (selectedYear, year) => {
    if (year === selectedYear) {
      return 10;
    } else {
      return 3;
    }
  };

  if (selectedYear === null) {
    return (
      <g>
        {lineChart.map((d) => (
          <circle
            key={d.value + "S"}
            cx={xScale(Number(d.year))}
            cy={yScale(d.value)}
            r={getRadius(selectedYear, d.year)}
            stroke="black"
            fill={getColor(selectedYear, d.year)}
          />
        ))}
      </g>
    );
  } else {
    return (
      <g>
        {/* draw background values */}
        {lineChart.map((d) => (
          <circle
            key={d.value}
            cx={xScale(Number(d.year))}
            cy={yScale(d.value)}
            r={getRadius(selectedYear, d.year)}
            stroke="black"
            fill={getColor(selectedYear, d.year)}
          />
        ))}

        {/* draw selected value */}
        {lineChart
          .filter((d) => d.year === selectedYear)
          .map((d) => (
            <circle
              key={d.value}
              cx={xScale(Number(d.year))}
              cy={yScale(d.value)}
              r={getRadius(selectedYear, d.year)}
              stroke="black"
              fill={getColor(selectedYear, d.year)}
            />
          ))}
      </g>
    );
  }
}
