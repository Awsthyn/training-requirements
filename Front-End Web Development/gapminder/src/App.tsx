import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';
import LineChart from './components/LineChart';

function App() {
  const [rows, setRows] = useState<any[]>([])
  const [countryNames, setCountryNames] = useState<string[]>([])
  const [dataPerCountry, setDataPerCountry] = useState<any[]>([])
  useEffect(() => {
    async function getData() {
      const response: any = await fetch('/data/gapminder_clean.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setRows(rows)
    }
    getData()
  }, []) 
  useEffect(() => {
    const _countryNames: Set<string>= new Set()
    let _dataPerCountry: any = {}
    rows.forEach(row => row["Country Name"] ? _countryNames.add(row["Country Name"]) : null)
    _countryNames.forEach(country => _dataPerCountry[country] = [])
    rows.forEach(row =>{
      const name = row["Country Name"]
       _dataPerCountry?.[name]?.push(row)})
    setDataPerCountry(_dataPerCountry)
    setCountryNames(Array.from(_countryNames))
    return () => {
    }
  }, [rows])
  return (
    <div className="App">
     <LineChart {...{ countryNames, dataPerCountry}} />
    </div>
  );
}

export default App;
