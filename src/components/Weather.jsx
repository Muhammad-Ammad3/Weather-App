import { SearchIcon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./Weather.css";
import rain from "../assets/rain.png";
import humidity from "../assets/humidity.png";
import snow from "../assets/snow.png";
import sun from "../assets/sun.png";
import sunCloudRain from "../assets/sunCloudRain.png";
import sunCloud from "../assets/sunCloud.png";
import wind from "../assets/wind.png";
import cloude from "../assets/cloude.png";


const Weather = () => {

  const [weatherData, setWeatherData] = useState(false)
  
  const allIcons = {
    "01d" : sun,
    "01n" : sun,
    "02d" : sunCloud,
    "02n" : sunCloud,
    "03d" : sunCloudRain,
    "03n" : sunCloudRain,
    "04d" : snow,
    "04n" : snow,
    "09d" : rain,
    "09n" : rain,
    "010d" : rain,
    "010n" : rain,
    "013d" : cloude,
    "013n" : cloude,
  }

  const search = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const icon = allIcons[data.weather[0].icon]
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temprature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });

    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      search("London");
    }, [])

  return (
    <div className="weather">
      <div className="searchBar">
        <input type="text" placeholder="Search" />
       <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ebfffc] cursor-pointer">
          <SearchIcon className="w-5 h-5 text-[#626262]" />
        </div>
      </div>
          <img src={weatherData.icon} alt="" className="weatherIcon"/>
        <p className="temprature">{weatherData.temprature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weatherData">
          <div className="col">
            <img src={humidity} alt="Humidity" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
            
          </div>
          <div className="col">
            <img src={wind} alt="Humidity" />
            <div>
              <p>3.6 km/h</p>
              <span>Wind Speed</span>
            </div>
            
          </div>
        </div>
    </div>

  );
};

export default Weather;
