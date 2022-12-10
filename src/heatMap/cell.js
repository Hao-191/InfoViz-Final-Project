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
    setShow,
    setProvince,
  } = props;

  return (
    <g
      transform={`translate(${xScale(dYear) - size / 2}, ${
        yScale(dRegion) - size / 2
      })`}
    >
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
          setShow(true);
          setProvince(dRegion);
        }}
        onMouseOut={() => {
          setSelectedRegion(null);
          setSelectedYear(null);
          setTooltipLeft(null);
          setTooltipTop(null);
          setShow(false);
        }}
      />
    </g>
  );
}
