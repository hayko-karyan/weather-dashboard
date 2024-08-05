import { useState } from "react";
import { CurrentWeather, Header, Search, Forecast, Alert, withLoading } from "@/components";
import { WeatherType } from "@/types/weather";
import axiosInstance from "@/utils/axiosInstance";

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
    try {
      const currentData = await axiosInstance.get(`/api/weather?city=${cityName}`);
      const responseFromApi: WeatherType = currentData.data;
      setWeatherData(responseFromApi)
      setIsSearching(false)
      setShowAlert(false);
    } catch (error) {
      debugger
      setWeatherData(defaultWeatherData)
      setShowAlert(true);
      console.log(error);
    }
  }

  const Content = () => <div className="flex justify-center items-center flex-col sm:flex-row">
    <CurrentWeather currentData={weatherData} />
    <Forecast currentData={weatherData} />
  </div>

  const ContentWithLoading = withLoading(Content);


  return (
    <>
      <Header />
      <Search onSearch={onSearch} />
      {weatherData.city && <ContentWithLoading isLoading={isSearching} />}
      {showAlert && <Alert setShowAlert={() => setShowAlert(false)} />}
    </>
  )
}

export default Weather;
