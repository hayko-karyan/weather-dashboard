import { CurrentWeather, Header, Search, Forecast, Loading, Alert } from "@/components";
import { fetchCurrentData,fetchForecast } from "@/services";
import { useState } from "react";
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>({});
  const [isSearching, setIsSearching] = useState<any>(false);
  const [showAlert, setShowAlert] = useState<any>(false);

  const onSearch = async ({ cityName }: any) => {
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
      {weatherData.city && (isSearching ? <Loading /> : (<><CurrentWeather currentData={weatherData} />
        <Forecast currentData={weatherData} /> </>))}
      {showAlert && <Alert setShowAlert={() =>setShowAlert(false)}/>}
    </>
  )
}

export default Weather;
