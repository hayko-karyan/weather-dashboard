export const fetchCurrentData = async (cityName: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
  );
  const data = await response.json() ;
  
  return data;
};

export const fetchForecast = async (cityName: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}&cnt=40&units=metric`
  );
  const data = await response.json() ;
  const fiveDayForecast = []
  for (let i = 0; i < 40; i=i+8) {
    fiveDayForecast.push(data.list[i]);
  }
  return fiveDayForecast;
};