import SearchBox from "./Searchbox";
import InfoBox from "./InfoBox";

export default function  WeatherApp() {
    return (
        <div style={{ textAlign:"center"}}>
            <h1 style={{color:"black"}} > Weather App</h1>
            <SearchBox/>
            <InfoBox/>
        </div>
    )
}