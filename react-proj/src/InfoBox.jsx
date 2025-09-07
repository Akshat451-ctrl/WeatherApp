// InfoBox.jsx
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function InfoBox({ info, setBgImg }) {
  // Agar info null ya undefined hai, render na karo
  if (!info) return null;

  // Default image (public direct image URL)
  let Img_Url =
    "https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?auto=compress&cs=tinysrgb&w=600";

  // Parse temperature safely
  let temp = parseInt(info?.temperature || "0");

  // Temperature ke hisaab se image change karo
  if (temp < 10) {
    Img_Url =
      "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=600"; // cold
  } else if (temp >= 10 && temp <= 25) {
    Img_Url =
      "https://images.pexels.com/photos/414491/pexels-photo-414491.jpeg?auto=compress&cs=tinysrgb&w=600"; // cloudy
  } else {
    Img_Url =
      "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=600"; // hot
  }

  // Background update parent me safely
  useEffect(() => {
    if (typeof setBgImg === "function") {
      setBgImg(Img_Url);
    }
  }, [Img_Url, setBgImg]);

  return (
    // Remove the outer div with background; let the parent handle the full-screen background
    <Card sx={{ width: "100%", maxWidth: 500, height: "auto", marginTop: "20px" }}> 
      <CardMedia component="img" height="150" image={Img_Url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info?.city || "Unknown City"}, {info?.country || "Unknown Country"}
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: "text.secondary" }}>
          <div>City: {info?.city || "-"}</div>
          <div>Temperature: {info?.temperature || "-"}</div>
          <div>Condition: {info?.condition || "-"}</div>
          <div>Humidity: {info?.humidity || "-"}</div>
          <div>Winds: {info?.winds || "-"}</div>
          <div>Local Time: {info?.localTime || "-"}</div>
        </Typography>
      </CardContent>
      <CardActions />
    </Card>
  );
}