"use client";
import { useState } from "react";

export const Search = ({ onSearch }: any) => {
  const [cityName, setCityName] = useState<string>('yerevan');

  const setCity = (e: any) => {
    const newCityName = e.target.value;
    setCityName(newCityName);
  }

  const fetchData = () => {
    onSearch({cityName});
  }

  return (
    <div className="p-24 flex justify-center">
      <input type="text" className="p-2 rounded-md mr-2" value={cityName} onChange={setCity} />
      <button className="bg-slate-900 text-white p-2 rounded-md" onClick={fetchData}>
        Search
      </button>
    </div>
  )
}
