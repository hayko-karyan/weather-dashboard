import { CurrentWeather, Header, Search, Forecast, Loading, Alert } from "@/components";
import { WeatherType } from "@/types/weather";
import { useState } from "react";

interface onSerachType {
  cityName: string
}

const Weather = () => {
  const defaultWeatherData = {
    city: '',
    data: { temperature: '', weatherConditions: '', humidity: '', windSpeed: '', feelsLike: '' },
    timestamp: [],
  }
  const [weatherData, setWeatherData] = useState<WeatherType>(defaultWeatherData);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onSearch = async ({ cityName }: onSerachType) => {
    setIsSearching(true)
    const currentData = await fetch(`/api/weather?city=${cityName}`);
    const responseFromApi: WeatherType = await currentData.json();
    debugger
    setWeatherData(responseFromApi)
    setIsSearching(false)
    if (responseFromApi.city) {
      setShowAlert(false);
      return;
    }
    setShowAlert(true);
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
