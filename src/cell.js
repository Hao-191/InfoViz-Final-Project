import React from "react";

export function Cell(props) {
  const {
    dYear,
    dRegion,
    xScale,
    yScale,
    size,
    color,
    setSelectedRegion,
    setSelectedYear,
    setTooltipLeft,
    setTooltipTop,
  } = props;

  return (
    <g transform={`translate(${xScale(dYear)}, ${yScale(dRegion)})`}>
      <rect
        width={size}
        height={size}
        fill={color}
        stroke={"black"}
        onMouseEnter={(e) => {
          setSelectedRegion(dRegion);
          setSelectedYear(dYear);
          setTooltipLeft(e.pageX);
          setTooltipTop(e.pageY);
        }}
        onMouseOut={() => {
          setSelectedRegion(null);
          setSelectedYear(null);
          setTooltipLeft(null);
          setTooltipTop(null);
        }}
      />
    </g>
  );
}
