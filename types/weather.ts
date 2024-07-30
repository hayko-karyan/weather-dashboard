export type WeatherData = {
  temperature: string,
  weatherConditions: string,
  humidity: string,
  windSpeed: string,
}

export type WeatherType = {
  [cityName: string]: {
    data: WeatherData;
    timestamp: number;
  }
}
