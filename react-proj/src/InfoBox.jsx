import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function InfoBox({ info }) {
  const Img_Url =
    "https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-50609-186980.jpg&fm=jpg";

  // Check if info is undefined or null
  if (!info) {
    return (
      <div className="cardContainer" style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Card sx={{ maxWidth: 345 }}>
     
        </Card>
      </div>
    );
  }

  return (
    <div className="cardContainer" style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="150" image={Img_Url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city}, {info.country}
          </Typography>
                      <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
              <div>City = {info.city}</div>
              <div>Temperature = {info.temperature}</div>
              <div>Condition = {info.condition}</div>
              <div>Humidity = {info.humidity}</div>
              <div>Winds = {info.winds}</div>
              <div>Local Time = {info.localTime}</div> {/* ✅ add time here */}
            </Typography>


        </CardContent>
        <CardActions />
      </Card>
    </div>
  );
}