"use client";
import { FC, KeyboardEventHandler, useState } from "react";

interface SearchProps {
  onSearch: Function;
}

export const Search: FC<SearchProps> = ({ onSearch }) => {
  const [cityName, setCityName] = useState<string>('yerevan');

  const setCity = (e: string) => {
    const newCityName = e;
    setCityName(newCityName);
  }

  const fetchData = () => {
    onSearch({cityName});
  }

  const onKeyDown = (e: any) => {
    if (e.key == 'Enter') {
      fetchData();
    }
  }

  return (
    <div className="p-24 flex justify-center">
      <input type="text" className="p-2 rounded-md mr-2" value={cityName} onChange={e => setCity(e.target.value)}  onKeyDown={onKeyDown}/>
      <button className="bg-slate-900 text-white p-2 rounded-md" onClick={fetchData}>
        Search
      </button>
    </div>
  )
}
