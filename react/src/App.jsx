import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [country, setCountry] = useState("India");
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCovidData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/countries/${country}`
      );

      const data = await response.json();
      setCovidData(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    
    fetchCovidData();
  }, []);

  return (
    <div className="container">
      <h1>API-Based COVID/Health Stats Tracker</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Country Name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button onClick={fetchCovidData}>Search</button>
      </div>

      {loading && <h2>Loading...</h2>}

      {covidData && !covidData.message && (
        <div className="card">
          <img
            src={covidData.countryInfo.flag}
            alt="flag"
            className="flag"
          />

          <h2>{covidData.country}</h2>

          <div className="stats">
            <div className="box">
              <h3>Total Cases</h3>
              <p>{covidData.cases.toLocaleString()}</p>
            </div>

            <div className="box">
              <h3>Recovered</h3>
              <p>{covidData.recovered.toLocaleString()}</p>
            </div>

            <div className="box">
              <h3>Deaths</h3>
              <p>{covidData.deaths.toLocaleString()}</p>
            </div>

            <div className="box">
              <h3>Active Cases</h3>
              <p>{covidData.active.toLocaleString()}</p>
            </div>
          </div>

          {covidData.active > 100000 && (
            <div className="alert">
              ⚠ High Risk Country Alert
            </div>
          )}
        </div>
      )}

      {covidData?.message && (
        <h2 className="error">
          Country Not Found
        </h2>
      )}
    </div>
  );
}

export default App;