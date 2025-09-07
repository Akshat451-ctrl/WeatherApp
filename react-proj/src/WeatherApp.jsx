// WeatherApp.jsx (assuming this is weather.jsx)
import { useState } from "react";
import Searchbox from "./Searchbox";  // Fixed import name to match file
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [bgImg, setBgImg] = useState("");

  return (
    <div
      style={{
        position: "fixed",  // Changed to fixed to ensure it covers the entire viewport without scrolling issues
        top: 0,
        left: 0,
        zIndex: 1,
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",  // Allow scrolling if content overflows
      }}
    >
      <h1 style={{ color: "white", textShadow: "1px 1px 3px black" }}>
        Weather App
      </h1>

      {/* SearchBox se weather data milega */}
      <Searchbox setWeather={setWeather} />

      {/* InfoBox weather data aur background update karega */}
      {weather && <InfoBox info={weather} setBgImg={setBgImg} />}
    </div>
  );
}