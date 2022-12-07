import React from "react";

export { XAxis, YAxis };

function XAxis (props) {
    const {chartType, xScale, height, width, axisLabel,} = props;
    //console.log('xScale', xScale)
    if (chartType === "scatter") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {xScale.ticks().map(tickValue =>
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                    <line y2={10} stroke='black' />
                    <text style={{textAnchor: 'middle', fontSize:'12px' }} y={20}>
                        {tickValue}
                    </text>
                </g>
            )}
            <text style={{ textAnchor:'end', fontSize:'12px'}} transform={`translate(${width}, ${height-10})`}>
                {axisLabel}
            </text>
        </g>
    }
    
}

function YAxis(props) {
    const {yScale, height, axisLabel} = props;

    return <g>
        {<line y2={height} stroke='black'/>}
        {yScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'12px' }} >
                    {tickValue}
                </text>
            </g>
        )}
    <text style={{ textAnchor:'end', fontSize:'12px'}} transform={`translate(20, 0) rotate(-90)`}>
        {axisLabel}
    </text> 
    </g>
    
}