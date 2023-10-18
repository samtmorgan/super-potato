import { LOADING } from '@/constants/statuses';
import { AddressStatus, IContextType, ICoords, LocationStatus, Weather, WeatherStatus } from '@/types/types';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getIpGeo, getReverseGeocode, getWeather } from '../api/api';

const AppContext = createContext<IContextType>({
  coords: null,
  setCoords: () => {},
  searchValue: '',
  setSearchValue: () => {},
  weatherAssets: null,
  setWeatherAssets: () => {},
  address: null,
  setAddress: () => {},
  weatherStatus: LOADING,
  setWeatherStatus: () => {},
  locationStatus: LOADING,
  addressStatus: LOADING,
  setLocationStatus: () => {},
  searchResults: null,
  setSearchResults: () => {},
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
  const [weatherAssets, setWeatherAssets] = useState<Weather | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[] | null>(['here', 'there']);
  const [searchValue, setSearchValue] = useState<string>('');

  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>(LOADING);
  const [addressStatus, setAddressStatus] = useState<AddressStatus>(LOADING);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>(LOADING);

  const contextValue = useMemo(
    () => ({
      coords,
      setCoords,
      searchValue,
      setSearchValue,
      weatherAssets,
      setWeatherAssets,
      address,
      setAddress,
      addressStatus,
      weatherStatus,
      setWeatherStatus,
      locationStatus,
      setLocationStatus,
      searchResults,
      setSearchResults,
    }),
    [
      coords,
      setCoords,
      searchValue,
      setSearchValue,
      weatherAssets,
      address,
      addressStatus,
      weatherStatus,
      setWeatherStatus,
      locationStatus,
      setLocationStatus,
      searchResults,
      setSearchResults,
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
    getWeather(coords, setWeatherStatus, setWeatherAssets);
  }, [coords]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
