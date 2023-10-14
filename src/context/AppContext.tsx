import { LOADING, NOT_INITIALIZED } from '@/constants/statuses';
import { IContextType, ICoords, IWeather, LocationStatus, Weather, WeatherStatus } from '@/types/types';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getIpGeo, getReverseGeocode, getWeather1 } from '../api/api';

const AppContext = createContext<IContextType>({
  coords: null,
  setCoords: () => {},
  weather: null,
  weatherAssets: null,
  address: null,
  weatherStatus: NOT_INITIALIZED,
  setWeatherStatus: () => {},
  locationStatus: NOT_INITIALIZED,
  setLocationStatus: () => {},
  //   resetState: () => {},
});

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext was used outside of its Provider');
  }
  return context;
};

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<ICoords | null>(null);
  //   const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<IWeather | null>(null);
  //   const [error, setError] = useState<boolean>(false);
  const [weatherAssets, setWeatherAssets] = useState<Weather | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>(NOT_INITIALIZED);
  const [addressStatus, setAddressStatus] = useState(NOT_INITIALIZED);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>(NOT_INITIALIZED);

  const contextValue = useMemo(
    () => ({
      coords,
      setCoords,
      weather,
      weatherAssets,
      address,
      addressStatus,
      weatherStatus,
      setWeatherStatus,
      locationStatus,
      setLocationStatus,
    }),
    [
      coords,
      setCoords,
      weather,
      weatherAssets,
      address,
      addressStatus,
      weatherStatus,
      setWeatherStatus,
      locationStatus,
      setLocationStatus,
    ],
  );

  // Get the coordinates from the IP
  useEffect(() => {
    getIpGeo(setCoords, setLocationStatus);
  }, []);

  // Get location text with coordinates
  useEffect(() => {
    if (coords) {
      getReverseGeocode(coords.lng, coords.lat, setAddress, setAddressStatus);
    }
  }, [coords]);

  // If we have coords to work with, retrieve the weather data and assets
  useEffect(() => {
    if (!coords) return;
    setWeatherStatus(LOADING);
    getWeather1(coords, setWeather, setWeatherStatus, setWeatherAssets);
  }, [coords]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
