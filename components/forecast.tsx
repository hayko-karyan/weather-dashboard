import { WeatherType } from '@/types/weather';
import { format } from 'date-fns';
import { FC } from 'react';

interface ForecastProps {
  currentData: WeatherType
}

export const Forecast: FC<ForecastProps> = ({ currentData }) =>
  <div className="p-20">
    <h2 className="text-xl font-medium">6-day forecast</h2>
    {currentData.timestamp.map((e: any, i: number) => {
      return (
        <div key={i} className='min-w-80 flex justify-between'>
          <p>{format(e.date, 'E, LLL d')}</p>
          <p>{e.temp.min} / {e.temp.max}°C</p>
          <p className='text-yellow-600'>{e.weather[0].description}</p>
        </div>)
    })}
  </div>
