import React from "react";
import { csv } from "d3";

const GetGDP = (url) => {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(url).then((data) => {
      data.forEach((d) => {
        d["2011"] = +d["2011"];
        d["2012"] = +d["2012"];
        d["2013"] = +d["2013"];
        d["2014"] = +d["2014"];
        d["2015"] = +d["2015"];
        d["2016"] = +d["2016"];
        d["2017"] = +d["2017"];
        d["2018"] = +d["2018"];
        d["2019"] = +d["2019"];
        d["2020"] = +d["2020"];
      });
      setData(data);
      //I didn't need this

      // setData(
      //   // data.map((e) => ({
      //   //   ...e,
      //   //   totalGDP: Object.values(e).reduce(
      //   //     (acc, cur) =>
      //   //       isNaN(Number(cur)) === false ? acc + Number(cur) : acc + 0,
      //   //     0
      //   //   ),
      //   // }))
      // );
    });
  }, []);
  return dataAll;
};

const GETGarbage = (url) => {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(url).then((data) => {
      data.forEach((d) => {
        d["2011"] = +d["2011"];
        d["2012"] = +d["2012"];
        d["2013"] = +d["2013"];
        d["2014"] = +d["2014"];
        d["2015"] = +d["2015"];
        d["2016"] = +d["2016"];
        d["2017"] = +d["2017"];
        d["2018"] = +d["2018"];
        d["2019"] = +d["2019"];
        d["2020"] = +d["2020"];
      });
      setData(data);
    });
  }, []);
  return dataAll;
};

const GetData = {
  GetGDP,
  GETGarbage,
};

export default GetData;
