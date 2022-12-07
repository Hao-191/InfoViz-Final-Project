import React from "react";

export function Tooltip(props) {
  const { garbageData, factorData, left, top, year, variable } = props;
  if (left === null) {
    return <div></div>;
  } else {
    const divStyle = {
      position: "absolute",
      textAlign: "left",
      width: "300px",
      height: "130px",
      padding: "2px",
      font: "13px sans-serif",
      background: "lightblue",
      opacity: 0.9,
      border: "0px",
      borderRadius: "8px",
      pointerEvents: "none",
      left: `${left - 300}px`,
      top: `${top}px`,
    };
    return (
      <div style={divStyle}>
        <p>{garbageData.Region}</p>
        <p>Year {year}</p>
        <ul>
          <li>Volume of Garbage: {garbageData[`${year}`]} (10000 tons)</li>
          <li>
            {variable}: {factorData[`${year}`]}{" "}
            {variable === "GDP"
              ? "(100 million yuan)"
              : variable === "Population"
              ? "(10000 persons)"
              : ""}
          </li>
        </ul>
      </div>
    );
  }
}
