import { IContextType, ICoords, IWeather, IWeatherAssets } from '@/types/types';
import { parseAddress } from '@/utils/locationHandler';
import { getWeatherAssets } from '@/utils/weatherTypes';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext<IContextType>({
  coords: null,
  setCoords: () => {},
  loading: true,
  weather: null,
  weatherAssets: null,
  address: null,
  error: false,
});

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext was used outside of its Provider');
  }
  return context;
};

const weatherApiUrl = 'https://api.open-meteo.com/v1/';
const weatherApiLat = 'forecast?latitude=';
const weatherApiLng = '&longitude=';
const weatherApiOpts = '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';

const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<ICoords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [weatherAssets, setWeatherAssets] = useState<IWeatherAssets | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const contextValue = useMemo(
    () => ({ coords, setCoords, loading, weather, weatherAssets, address, error }),
    [coords, setCoords, loading, weather, weatherAssets, address, error],
  );

  useEffect(() => {
    if (!coords) return;

    const url = `${weatherApiUrl}${weatherApiLat}${coords.lat}${weatherApiLng}${coords.lng}${weatherApiOpts}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 404) {
          setError(true);
        }
        setError(true);
        throw new Error('You have an error');
      })
      .then(object => {
        // console.log(object);
        setWeather(object);
        setError(false);
        setLoading(false);
      });
    //   .catch(error => console.log(error));
  }, [coords]);

  useEffect(() => {
    if (weather) {
      const weatherCode = weather?.current_weather?.weathercode;
      const isDay = weather?.current_weather?.is_day;
      //   if (weatherCode && isDay) {
      //   console.log('should get weather');
      const assets = getWeatherAssets(weatherCode, isDay);
      setWeatherAssets(assets);
      //   }
      //   const assets = getWeatherAssets(weather.current_weather.weathercode, weather.current_weather.is_day);
      //   setWeatherAssets(assets);
    }
  }, [weather]);

  useEffect(() => {
    const override = false;
    if (!coords || override) return;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${googleKey}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 404) {
          //   setError(true);
        }
        // setError(true);
        throw new Error('You have an error');
      })
      .then(object => {
        const res = parseAddress(object);
        console.log(res);
        setAddress(res);
        // setWeather(object);
        // setError(true);
        // setLoading(false);
      });
    //   .catch(error => console.log(error));
  }, [coords]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
