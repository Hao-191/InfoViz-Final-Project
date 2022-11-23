import React from "react";
import { csv,  } from "d3";

const GetGDP = (url) => {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(url).then(data => {
            console.log("GDP:", data)
            setData(data);
        });
    }, []);
    return dataAll;
}

const GETGarbage = (url) => {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(url).then(data => {
            setData(data);
        });
    }, []);
    return dataAll;
}

const GetData = {
    GetGDP, 
    GETGarbage
}

export default GetData