import { format } from 'date-fns';

export const Forecast = ({ currentData }: any) =>
  <div className="p-20">
    <h2 className="text-xl font-medium">5-day forecast</h2>
    {currentData.timestamp.map((e: any) => {
      return (
        <div className='min-w-80 flex justify-between'>
          <p>{format(e.dt_txt, 'E, LLL d')}</p>
          <p>{e.main.temp_min} / {e.main.temp_max}°C</p>
          <p className='text-yellow-600'>{e.weather[0].description}</p>
        </div>)
    })}
  </div>
