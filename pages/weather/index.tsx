import { CurrentWeather, Header, Search, Forecast, Loading, Alert } from "@/components";
import { fetchCurrentData, fetchForecast } from "@/services";
import { WeatherType } from "@/types/weather";
import { useState } from "react";
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherType>({
    city: '',
    data: {temperature: '', weatherConditions: '', humidity: '', windSpeed: '', feelsLike: ''},
    timestamp: [],
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  interface onSerachType {
    cityName: string
  }

  const onSearch = async ({ cityName }: onSerachType) => {
    const isCityExist = myCache.get(cityName);

    if (!(isCityExist)) {
      setIsSearching(true)
      const response = await fetchCurrentData(cityName);

      setIsSearching(false)
      if (response.main) {
        const forecast = await fetchForecast(cityName);
        myCache.mset([
          {
            key: cityName, val: {
              data: {
                temperature: response.main.temp,
                feelsLike: response.main.feels_like,
                weatherConditions: response.weather[0].description,
                humidity: response.main.humidity,
                windSpeed: response.wind.speed,
              },
              timestamp: forecast
            }, ttl: 600
          },
        ])
      } else {
        setWeatherData({});
        setShowAlert(true);
        return;
      }
    }
    setWeatherData({ city: cityName, ...myCache.get(cityName) })
    setShowAlert(false);
  }

  return (
    <>
      <Header />
      <Search onSearch={onSearch} />
      {weatherData.city && (isSearching ? <Loading /> : (<div className="flex justify-center items-center flex-col sm:flex-row"><CurrentWeather currentData={weatherData} />
        <Forecast currentData={weatherData} /> </div>))}
      {showAlert && <Alert setShowAlert={() => setShowAlert(false)} />}
    </>
  )
}

export default Weather;
