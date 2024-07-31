import { format } from "date-fns";

export const CurrentWeather = ({ currentData }: any) =>
  <div className="p-24">
    <p className='text-sm text-red-500'>{format(new Date(), 'E, LLL d')}</p>
    <h1 className="text-3xl uppercase">{currentData?.city}</h1>
    <p className="text-2xl">
      {currentData?.data?.temperature} °C
    </p>
    <p className="font-medium">
      Feels like {currentData?.data?.feelsLike} °C. {currentData?.data?.weatherConditions}
    </p>
    <p>
      Humidity: {currentData?.data?.humidity}%
    </p>
    <p>
      Wind Speed: {currentData?.data?.windSpeed}
    </p>
  </div>
