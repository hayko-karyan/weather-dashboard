export interface WeatherData {
  temperature: string,
  weatherConditions: string,
  humidity: string,
  windSpeed: string,
  feelsLike: string
}

export interface WeatherType  {
  city: string,
  data: WeatherData,
  timestamp: TimeStamp[],
}

export interface TimeStamp {
  time: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  pod: string;
}

export interface ListItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ListItem[];
  city: City;
}

export interface DailyForecast {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
}
