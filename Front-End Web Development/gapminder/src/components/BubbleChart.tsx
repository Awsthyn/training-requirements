import React, { useState } from "react";
import { COLORS, CountryHash, options } from "./controllers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bubble } from "react-chartjs-2";

const BubbleChart = ({
  countryNames,
  dataPerCountry,
  years,
}: {
  countryNames: string[];
  dataPerCountry: CountryHash;
  years: string[];
}) => {
  const [xVariable, setXVariable] = useState("");
  const [yVariable, setYVariable] = useState("");
  const [year, setYear] = useState("2007");

  const data = {
    datasets: countryNames.slice(0, 70).map((country) => {
      const random = Math.floor(Math.random() * COLORS.length);
      const color = COLORS[random];
      const pointData = dataPerCountry[country]?.filter(
        (row: any) => row["Year"] === year
      );
      return {
        label: country,
        data: pointData.map((row: any) => {
          return {
            x: row[xVariable],
            y: row[yVariable],
            label: row["Country Name"],
          };
        }),
        fill: false,
        backgroundColor: color,
        borderColor: color,
        radius: pointData[0]["pop"] / 10000000,
        borderWidth: 5,
      };
    }),
  };
  return (
    <div>
      <div className="d-flex flex-row">
          <div className="d-flex flex-column align-items-center mt-3 ms-1 w-50">
              <h5>Select a variable for X axis</h5>
        <select
          value={xVariable}
          onChange={(e) => setXVariable(e.target.value)}
          className="form-select form-select-lg"
          aria-label="select"
        >
          {dataPerCountry["Algeria"]?.[0] &&
            Object.keys(dataPerCountry["Algeria"]?.[0])
              ?.filter(
                (variable) =>
                  variable !== "continent" &&
                  variable !== "Year" &&
                  variable !== "Country Name" &&
                  variable !== ""
              )
              .map((variable, index) => (
                <option key={"x" + index} value={variable}>
                  {variable}
                </option>
              ))}
        </select>
        </div>
        <div className="d-flex flex-column align-items-center mt-3 ms-1 w-50">
              <h5>Select a variable for Y axis</h5>
        <select
          value={yVariable}
          onChange={(e) => setYVariable(e.target.value)}
          className="form-select form-select-lg"
          aria-label="select"
        >
          {dataPerCountry["Algeria"]?.[0] &&
            Object.keys(dataPerCountry["Algeria"]?.[0])
              ?.filter(
                (variable) =>
                  variable !== "continent" &&
                  variable !== "Year" &&
                  variable !== "Country Name" &&
                  variable !== ""
              )
              .map((variable, index) => (
                <option key={"y" + index} value={variable}>
                  {variable}
                </option>
              ))}
        </select>
        </div>
        <div className="d-flex flex-column align-items-center mt-3 ms-1 w-50">
              <h5>Select a year</h5>
        <select
          value={yVariable}
          onChange={(e) => setYear(e.target.value)}
          className="form-select form-select-lg"
          aria-label="select"
        >
          {years?.map((year, index) => (
            <option key={"year" + index} value={year}>
              {year}
            </option>
          ))}
        </select>
        </div>
      </div>
      <Bubble type="bubble" {...{ data, options }} />
    </div>
  );
};

export default BubbleChart;
