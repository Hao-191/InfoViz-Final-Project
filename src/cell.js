import React from "react";

export function Cell(props){
    const {dYear, dRegion, xScale, yScale, size, color} = props;
    return <g transform={`translate(${xScale(dYear)}, ${yScale(dRegion)})`}>
        <rect width={size} height={size} fill={color} stroke={"black"} />
    </g>
}