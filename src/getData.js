import React from "react";
import { csv } from "d3";

const GetVariable = (url) => {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(url).then((data) => {
      data.forEach((d) => {
        Object.keys(d).forEach((k) => {
          Number(k) >= 2002 && Number(k) <= 2021
            ? (d[k] = +d[k])
            : (d[k] = d[k]);
        });
      });
      setData(data);
    });
  }, []);
  return dataAll;
};

const GetGarbage = (url) => {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(url).then((data) => {
      data.forEach((d) => {
        Object.keys(d).forEach((k) => {
          Number(k) >= 2002 && Number(k) <= 2021
            ? (d[k] = +d[k])
            : (d[k] = d[k]);
        });
      });
      setData(data);
    });
  }, []);
  return dataAll;
};

const GetData = {
  GetGarbage,
  GetVariable,
};

export default GetData;
