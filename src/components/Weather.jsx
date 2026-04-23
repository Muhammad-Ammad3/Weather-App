import { Search, Droplets, Wind } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);

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

      // Colorful Icon URL
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: iconUrl,
        description: data.weather[0].description,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    search("Karachi");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search(inputRef.current.value);
  };

  return (
    // Fixed Width container, Center align, No Scroll
    <div className="flex flex-col items-center p-8 rounded-[2.5rem] bg-indigo-950/20 backdrop-blur-xl border border-indigo-200/20 shadow-2xl w-[90vw] max-w-100 transition-all duration-500 overflow-hidden">
      
      {/* Visibility-Focused Search Bar */}
      <div className="flex items-center gap-3 w-full mb-6 group">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search City..."
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-indigo-950 placeholder-indigo-700/80 outline-none focus:ring-2 focus:ring-purple-400/70 transition-all text-lg"
          />
          <Search className="absolute left-4 top-3.5 text-indigo-700 w-5 h-5" />
        </div>
        <button
          onClick={() => search(inputRef.current.value)}
          className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white text-purple-700 shadow-lg active:scale-95 transition-transform hover:bg-purple-50 hover:shadow-purple-500/20"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      {weatherData ? (
        <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
          
          {/* Main Weather Icon Area with Glow for visibility */}
          <div className="relative group">
             <div className="absolute inset-0 bg-cyan-100/30 blur-3xl rounded-full transition-all"></div>
             <img
               src={weatherData.icon}
               alt="weather icon"
               className="w-44 h-44 drop-shadow-2xl relative z-10"
             />
          </div>

          <div className="text-center -mt-4">
            <h2 className="text-white text-7xl font-black tracking-tighter drop-shadow-sm">
              {weatherData.temperature}°
            </h2>
            <p className="text-white text-3xl font-bold tracking-tight mt-1 capitalize drop-shadow-sm">
              {weatherData.location}
            </p>
            <p className="text-white/80 font-semibold tracking-widest uppercase text-[11px] mt-2 drop-shadow-sm">
              {weatherData.description}
            </p>
          </div>

          {/* Optimized Visibility Stats Section */}
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            {/* Humidity */}
            <div className="flex flex-col items-center bg-indigo-950/20 p-5 rounded-3xl border border-indigo-200/10 shadow-inner">
              <Droplets className="text-cyan-400 w-7 h-7 mb-2.5 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
              <p className="text-cyan-400 font-extrabold text-2xl drop-shadow-sm">{weatherData.humidity}%</p>
              <span className="text-indigo-950 text-[11px] uppercase font-extrabold tracking-widest mt-1">Humidity</span>
            </div>

            {/* Wind */}
            <div className="flex flex-col items-center bg-indigo-950/20 p-5 rounded-3xl border border-indigo-200/10 shadow-inner">
              <Wind className="text-emerald-400 w-7 h-7 mb-2.5 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
              <p className="text-emerald-400 font-extrabold text-2xl drop-shadow-sm">{weatherData.windSpeed} <span className="text-xs font-semibold text-emerald-300">km/h</span></p>
              <span className="text-indigo-950 text-[11px] uppercase font-extrabold tracking-widest mt-1">Wind</span>
            </div>
          </div>

        </div>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Weather;