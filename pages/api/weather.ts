import { NextApiRequest, NextApiResponse } from "next";
import { DailyForecast, ForecastResponse, ListItem } from "@/types/weather";
import axiosInstance from "@/utils/axios-instance";
import myCache from '../../utils/cache';

const fetchAndGroupByDay = async (apiUrl: string): Promise<DailyForecast[]> => {
  const response = await axiosInstance.get(apiUrl);
  const data: ForecastResponse = response.data;

  const dailyForecasts: { [date: string]: DailyForecast } = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // Extract date part
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        temp: {
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        weather: item.weather,
        clouds: item.clouds,
        wind: item.wind
      };
    } else {
      dailyForecasts[date].temp.min = Math.min(dailyForecasts[date].temp.min, item.main.temp_min);
      dailyForecasts[date].temp.max = Math.max(dailyForecasts[date].temp.max, item.main.temp_max);
    }
  });

  return Object.values(dailyForecasts);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { city } = req.query;
  try {
    const isCityExist = myCache.get(city);

    if (!(isCityExist)) {
      console.log('fetch');
      
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
      const response = await axiosInstance.get(weatherApiUrl);
      const data: ListItem = response.data;
      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
      const dailyForecasts = await fetchAndGroupByDay(forecastApiUrl);
      myCache.mset([
        {
          key: city, val: {
            data: {
              temperature: data.main.temp,
              feelsLike: data.main.feels_like,
              weatherConditions: data.weather[0].description,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
            },
            timestamp: dailyForecasts
          }, ttl: 600
        },
      ])
    }
    const currentData = { city: city, ...myCache.get(city) }
    res.status(200).json(currentData);
  } catch (error: any) {
    res.status(500).json({ message: error.response.data.message });
  }
}

export default handler;