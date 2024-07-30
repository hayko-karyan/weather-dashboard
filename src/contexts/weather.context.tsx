'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { WeatherType } from '@/types/weather'

interface WeatherContextProps {
  weather: WeatherType
  setWeather: (weather: WeatherType) => void
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined)

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherType>({})

  return (
    <WeatherContext.Provider
      value={{ weather, setWeather }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('useWeatherContext must be used within an WeatherProvider')
  }
  return context
}
