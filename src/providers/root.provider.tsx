'use client'
import { FC, ReactNode } from 'react'
import { WeatherProvider } from '@/contexts'

interface ProviderProps {
  children: ReactNode
}

export const RootProvider: FC<ProviderProps> = ({ children }) => {
  return (
    <WeatherProvider>{children}</WeatherProvider>
  )
}
