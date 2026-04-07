import { SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

import rain from "../assets/rain.png";
import humidity from "../assets/humidity.png";
import snow from "../assets/snow.png";
import sun from "../assets/sun.png";
import sunRain from "../assets/sunRain.png";
import sunCloude from "../assets/sunCloude.png";
import moonCloude from "../assets/moonCloude.png";
import moonRain from "../assets/moonRain.png"; // agar available ho
import wind from "../assets/wind.png";
import cloude from "../assets/cloude.png";
import mist from "../assets/mist.png";
import storm from "../assets/storm.png";
import moon from "../assets/moon.png";

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": sun,
    "01n": moon,
    "02d": sunCloude,
    "02n": moonCloude,
    "03d": cloude,
    "03n": cloude,
    "04d": cloude,
    "04n": cloude,
    "09d": rain,
    "09n": rain,
    "10d": sunRain,
    "10n": moonRain, // ya temporary moon use kar sakte ho
    "11d": storm,
    "11n": storm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || sun;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await search("London");
    };
    fetchData();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
      
      <div className="searchBar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          onKeyDown={handleKeyDown}
        />
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ebfffc] cursor-pointer"
          onClick={() => search(inputRef.current.value)}
        >
          <SearchIcon className="w-5 h-5 text-[#626262]" />
        </div>
      </div>

      {/* Weather Data */}
      {weatherData && (
        <>
          <img
            src={weatherData.icon}
            alt="weather"
            className="weatherIcon"
          />

          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weatherData">
            <div className="col">
              <img src={humidity} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind} alt="Wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;