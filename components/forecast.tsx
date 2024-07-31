import { format } from 'date-fns';

export const Forecast = ({ currentData }: any) =>
  <div>
    <h2 className='text-center'>5-day forecast</h2>
    {currentData.timestamp.map((e: any) => {
      return (
        <div className='flex justify-center'>
          <p className='w-32'>{format(e.dt_txt, 'E, LLL d')}</p>
          <p className='w-32'>{e.weather[0].description}</p>
          <p className='w-30'>{e.main.temp_min} / {e.main.temp_max}°C</p>
        </div>)
    })}
  </div>
