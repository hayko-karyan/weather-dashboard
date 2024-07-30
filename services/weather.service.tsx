export const fetchWeatherData = async (cityName: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json() ;
  
  return data;
};
