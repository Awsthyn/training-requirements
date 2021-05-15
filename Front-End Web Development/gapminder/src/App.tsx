import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import LineChart from "./components/LineChart";
import BubbleChart from "./components/BubbleChart";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {
  const [rows, setRows] = useState<any[]>([]);
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const [dataPerCountry, setDataPerCountry] = useState<any[]>([]);
  useEffect(() => {
    async function getData() {
      const response: any = await fetch("/data/gapminder_clean.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); 
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); 
      const results = Papa.parse(csv, { header: true }); 
      const rows = results.data
      setRows(rows);
    }
    getData();
  }, []);
  useEffect(() => {
    const _countryNames: Set<string> = new Set();
    const _years: Set<string> = new Set();

    let _dataPerCountry: any = {};
    rows.forEach((row) =>
      row["Country Name"] ? _countryNames.add(row["Country Name"]) : null
    );
    _countryNames.forEach((country) => (_dataPerCountry[country] = []));
    rows.forEach((row) => {
      const name = row["Country Name"];
      _dataPerCountry?.[name]?.push(row);
      row["Year"] && _years.add(row["Year"]);
    });
    setDataPerCountry(_dataPerCountry);
    setCountryNames(Array.from(_countryNames));
    setYears(Array.from(_years));
    return () => {};
  }, [rows]);

  return (
    <Router>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/bubble-chart"
        render={(props) => (
          <BubbleChart {...{ countryNames, dataPerCountry, years }} />
        )}
      />
            <Route
        exact
        path="/line-chart"
        render={(props) => (
          <LineChart {...{ countryNames, dataPerCountry}} />
        )}
      />
    </Router>
  );
}

export default App;
