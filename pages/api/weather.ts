import { DailyForecast, ForecastResponse, ListItem } from "@/types/weather";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

const myCache: any = new NodeCache();

const fetchAndGroupByDay = async (apiUrl: string): Promise<DailyForecast[]> => {
  const response = await fetch(apiUrl);
  const data: ForecastResponse = await response.json();

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
  const defaultWeatherData = {
    city: '',
    data: { temperature: '', weatherConditions: '', humidity: '', windSpeed: '', feelsLike: '' },
    timestamp: [],
  }

  try {
    debugger
    const isCityExist = myCache.get(city);

    let currentData = defaultWeatherData;

    if (!(isCityExist)) {
      console.log('fetching');
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
      const response = await fetch(weatherApiUrl);
      const data: ListItem = await response.json();
      if (data.main) {
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
      } else {
        return res.status(200).json(currentData);
      }
    }
    currentData = { city: city, ...myCache.get(city) }
    res.status(200).json(currentData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

export default handler;