import { useState } from "react";
import "./App.css";


function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const API_KEY = "57930bc180cb4357b5d94325252710"; // Replace with your real API key

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setData(null);

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
        city.trim()
      )}`;

      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json?.error?.message || "Bad request");
      }

      setData(json);
    } catch (err) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data...</p>}

      {data && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{data.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{data.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

