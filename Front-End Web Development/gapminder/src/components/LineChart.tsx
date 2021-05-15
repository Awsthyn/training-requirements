import React from "react";
import { Line } from "react-chartjs-2";
import { COLORS, options } from "./controllers";
import 'bootstrap/dist/css/bootstrap.min.css';

interface CountryHash {
  [key: string]: any;
}

const LineChart = ({
  countryNames,
  dataPerCountry,
}: {
  countryNames: string[];
  dataPerCountry: CountryHash;
}) => {
  const [variable, setVariable] = React.useState<string>("CO2 emissions (metric tons per capita)");

  const data = {
    datasets: countryNames.slice(1, 70).map((country) => {
      const random = Math.floor(Math.random() * COLORS.length);
      const color = COLORS[random];
      return {
        label: country,
        data: dataPerCountry[country]?.map((row: any) => {
          return {
            x: row["Year"],
            y: row[variable],
            label: row["Country Name"],
          };
        }),
        fill: false,
        backgroundColor: color,
        borderColor: color,
        tension: 0.1,
        borderWidth: 5,
      };
    }),
  };

  return (
    <div>
        <select value={variable} onChange={(e)=> setVariable(e.target.value)} className="form-select form-select-lg w-50 mt-3 ms-5" aria-label="select">
          {dataPerCountry["Algeria"]?.[0] && Object.keys(dataPerCountry["Algeria"]?.[0])?.filter(variable => variable !== "Year" && variable !== "Country Name" && variable !== "").map((variable, index) => (
            <option key={index} value={variable}>
              {variable}
            </option>
          ))}
        </select>
      <Line type={"line"} data={data} options={options} />
    </div>
  );
};

export default LineChart;
