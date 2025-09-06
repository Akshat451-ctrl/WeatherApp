import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import InfoBox from './InfoBox';

export default function SearchBox() {
  const Api_Url = "https://api.openweathermap.org/data/2.5/weather";
  const Api_Key = "9cf95208cbefe885f8d06b07318cc75f";

  let [city, setCity] = useState("");
  let [weather, setWeather] = useState(null);
  let [error, setError] = useState("");
  let [recentCities, setRecentCities] = useState([]);
  let [showRecent, setShowRecent] = useState(false);

  let getWeatherInfo = async (city) => {
    try {
      let response = await fetch(`${Api_Url}?q=${city}&appid=${Api_Key}&units=metric`);
      let jsonResponse = await response.json();

      if (city && !recentCities.includes(city)) {
        setRecentCities([city, ...recentCities]);
      }

      if (response.ok) {
        // Local time calculation
        const targetDate = new Date(Date.now() + jsonResponse.timezone * 1000);

        // Use UTC getters so we interpret that Date's UTC fields,
        // which correspond to the city's local time.
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = weekdays[targetDate.getUTCDay()];
        const hours = String(targetDate.getUTCHours()).padStart(2, "0");
        const minutes = String(targetDate.getUTCMinutes()).padStart(2, "0");
        const timeStr = `${dayName}, ${hours}:${minutes}`;
        let newWeather = {
          city: jsonResponse.name,
          country: jsonResponse.sys.country,
          temperature: `${jsonResponse.main.temp}°C`,
          condition: jsonResponse.weather[0].description,
          humidity: `${jsonResponse.main.humidity}%`,
          winds: `${jsonResponse.wind.speed} m/s`,
          localTime: timeStr, // ✅ ab sahi se set hoga
        };

        setWeather(newWeather);
        setError("");
      } else {
        setWeather(null);
        setError(jsonResponse.message);
      }
    } catch (err) {
      setError("Something went wrong!");
      setWeather(null);
    }
  };

  let handleChange = (e) => setCity(e.target.value);

  let handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      getWeatherInfo(city);
      setCity("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3 style={{ color: "black", marginBottom: "20px" }}>🌦 Search For Weather</h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
      >
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          style={{ width: "300px" }}
        />
        <Button variant="contained" type="submit" style={{ height: "56px" }}>
          Search
        </Button>
      </form>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {/* Toggle Button */}
      <Button
        variant="outlined"
        onClick={() => setShowRecent(!showRecent)}
        style={{ marginTop: "10px" }}
      >
        {showRecent ? "Hide Recent Cities" : "Show Recent Cities"}
      </Button>

      {/* Conditionally render recent cities */}
      {showRecent && recentCities.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h4>Recent Cities:</h4>
          <ul>
            {recentCities.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Agar weather data hai toh InfoBox dikhao */}
      {weather && <InfoBox info={weather} />}
    </div>
  );
}
