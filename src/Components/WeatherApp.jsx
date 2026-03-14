import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {

const [city,setCity] = useState("");
const [weather,setWeather] = useState(null);

const handleInput = (e)=>{
setCity(e.target.value);
};

const fetchWeather = async()=>{

if(!city) return;

try{

const res = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7ef752fc0f81ea48cd886af40be1c2dc`
);

console.log(res);
setWeather(res.data);

}catch(err){
console.log("Weather Fetch Error",err);
}

};

return (

<div className="main-container">

{/* Cloud Animation */}
<div className="cloud-layer">
<div className="cloud"></div>
<div className="cloud cloud2"></div>
<div className="cloud cloud3"></div>
</div>

{/* Rain Animation */}
<div className="rain">
{Array.from({length:260}).map((_,i)=>(
<span key={i}></span>
))}
</div>

<div className="weather-box">

<h1 className="title">🌧 Weather App</h1>

<div className="search-box">

<input
type="text"
value={city}
onChange={handleInput}
placeholder="Enter City Name"
/>

<button onClick={fetchWeather}>Search</button>

</div>

{weather && (

<div className="weather-card">

<h2>{weather.name}</h2>


<img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="weather icon"
/>

<p className="temp">
{(weather.main.temp - 273.15).toFixed(1)} °C
</p>

<p className="desc">
{weather.weather[0].description}
</p>

</div>

)}

</div>

</div>

);

};

export default WeatherApp;