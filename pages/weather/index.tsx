import { CurrentWeather, Header, Search, Forecast } from "@/components";
import { fetchWeatherData } from "@/services";
import { WeatherType } from "@/types/weather";
import { useState } from "react";
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>({});

  const onSearch = async ({ cityName }: any) => {
    const isCityExist = myCache.get(cityName);

    debugger
    if (!(isCityExist)) {
      const response = await fetchWeatherData(cityName);
      myCache.mset([
        {
          key: cityName, val: {
            data: {
              temperature: response.main.temp,
              weatherConditions: response.weather[0].description,
              humidity: response.main.humidity,
              windSpeed: response.wind.speed,
            },
            timestamp: 10
          }, ttl: 10000
        },
      ])
    }
    setWeatherData({city: cityName, ...myCache.get(cityName)})
  }

  return (
    <>
      <Header />
      <Search onSearch={onSearch} />
      <CurrentWeather currentData={weatherData} />
      <Forecast currentData={weatherData} />
      {JSON.stringify(weatherData)}
    </>
  )
}

export default Weather;