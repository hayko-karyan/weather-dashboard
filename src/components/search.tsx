"use client";
import { fetchWeatherData } from "@/services";
import { useState } from "react";
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const Search = () => {
  const [cityName, setCityName] = useState('yerevan');

  const setCity = (e: any) => {
    const newCityName = e.target.value;
    setCityName(newCityName);
  }

  const fetchData = async () => {
    const isCityExist = myCache.get(cityName);

    if (!(isCityExist)) {
      const response = await fetchWeatherData(cityName);
      myCache.mset([
        { key: cityName, val: {
          data: {
            temperature: response.main.temp,
            weatherConditions: response.weather[0].description,
            humidity: response.main.humidity,
            windSpeed: response.wind.speed,
          },
          timestamp: 10
        }, ttl: 10000 },
      ])
    }
  }

  return (
    <div className="p-24 flex justify-center">
      <input type="text" className="p-2 rounded-md mr-2" value={cityName} onChange={setCity} />
      <button className="bg-slate-900 text-white p-2 rounded-md" onClick={fetchData}>
        Search
      </button>
    </div>
  )
}
