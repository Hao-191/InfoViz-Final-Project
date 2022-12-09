import React from "react";
import { scaleLinear } from 'd3';

export function Legend(props) {
    const {x, y, width, height, colormap} = props; 
    const xScale = scaleLinear().range([x, x+width]).domain([0,1]).nice();
    const ticks = xScale.ticks(4);
    const text = ["Low", " ", " ", " ", " ", "High"]
    return <g>
        <defs>
            <linearGradient id={"gradient"} x1="0%" y1="0%" x2="100%" y2="0%">
                {
                    ticks.map( tick => {
                        return <stop key={`${tick}stop`} offset={`${100*tick}%`} 
                        stopColor={colormap(tick)}/>
                    })
                }
            </linearGradient>
        </defs>
        <rect x={x} y={y} width={width} height={height} style={{fill:"url(#gradient)"}}/>
        {
            ticks.map( tick => {
                return <g key={tick} transform={`translate(${xScale(tick)}, ${y})`}>
                    <line y2={height} stroke={'black'} />
                    <text style={{textAnchor:'middle'}} y={height+15}>
                        {text.shift()}
                    </text>
                </g>}
            )
        }
    </g>
}