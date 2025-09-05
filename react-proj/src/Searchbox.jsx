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

  let getWeatherInfo = async (city) => {
    try {
      let response = await fetch(`${Api_Url}?q=${city}&appid=${Api_Key}&units=metric`);
      let jsonResponse = await response.json();

      if (response.ok) {
        let newWeather = {
          city: jsonResponse.name,
          country: jsonResponse.sys.country,
          temperature: `${jsonResponse.main.temp}°C`,
          condition: jsonResponse.weather[0].description,
          humidity: `${jsonResponse.main.humidity}%`,
          winds: `${jsonResponse.wind.speed} m/s`,
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
          <h3>Weather is rainy</h3>
        </Button>
      </form>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {/* Agar weather data hai toh InfoBox dikhao */}
      {weather && <InfoBox info={weather} />}
    </div>
  );
}
