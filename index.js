import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import GetData from "./getData";

const GDPUrl =  'https://gist.githubusercontent.com/Hao-191/1b05871531ce71a82d36be51bde6c11b/raw/2118f515ad09e3430da298e5d3575c404e36eb0a/GDPbyProvince.csv'
const GarbageUrl =  'https://gist.githubusercontent.com/Hao-191/1b05871531ce71a82d36be51bde6c11b/raw/2118f515ad09e3430da298e5d3575c404e36eb0a/VolumeofGarbagebyProvince.csv'

function HeatMap(){

    const garbage = GetData.GETGarbage(GarbageUrl)
    if(!garbage){
        return <pre>Loading...</pre>
    }

    const WIDTH = 900;
    const HEIGHT = 400;
    const margin = {top: 200, right: 40, bottom: 50, left: 60};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;

    const YEAR = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];
    const PROVINCE = garbage.map(d => d.Region);

    const xScale = Scales.band(YEAR, 0, width);
    const yScale = Scales.band(PROVINCE, 0, height);

    return <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
            garbage.map( d => {        
                Object.keys(d).map(element => {
                    if(YEAR.includes(element)) {
                        console.log(element, d.Region)
                        return <Cell dYear={element} dRegion = {d.Region} xScale={xScale} yScale={yScale} color={"green"} />
                    }
                })
            } )
        }
        </g>
    </svg>
};

ReactDOM.render(<HeatMap/>, document.getElementById('root'));