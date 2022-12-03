import React from "react";

export function Cell(props){
    const {dYear, dRegion, xScale, yScale, color} = props;
    return <g transform={`translate(${xScale(dYear)}, ${yScale(dRegion)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"} />
    </g>
}