export type WeatherData = {
  temperature: string | number,
  weatherConditions: string | number,
  humidity: string | number,
  windSpeed: string | number,
  feelsLike: string
}

export type WeatherType = {
  city: string,
  data: WeatherData,
  timestamp: [],
}

