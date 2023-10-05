import { ERROR, LOADING, NOT_INIT, SUCCESS } from '@/constants/addressStatus';
import { IContextType, ICoords, IWeather, IWeatherAssets } from '@/types/types';
import { parseAddress } from '@/utils/locationHandler';
import { getWeatherAssets } from '@/utils/weatherTypes';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext<IContextType>({
  coords: null,
  setCoords: () => {},
  weather: null,
  weatherAssets: null,
  address: null,
  weatherStatus: NOT_INIT,
  setWeatherStatus: () => {},
  resetState: () => {},
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

const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const googleApiKeySegment = `&key=${googleKey}`;

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<ICoords | null>(null);
  //   const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<IWeather | null>(null);
  //   const [error, setError] = useState<boolean>(false);
  const [weatherAssets, setWeatherAssets] = useState<IWeatherAssets | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<string>(NOT_INIT);
  const [addressStatus, setAddressStatus] = useState(NOT_INIT);

  const resetState = useCallback(() => {
    setCoords(null);
    setWeather(null);
    setWeatherAssets(null);
    setAddress(null);
    setWeatherStatus(NOT_INIT);
  }, [setCoords, setWeather, setWeatherAssets, setAddress, setWeatherStatus]);

  const contextValue = useMemo(
    () => ({ coords, setCoords, weather, weatherAssets, address, weatherStatus, setWeatherStatus, resetState }),
    [coords, setCoords, weather, weatherAssets, address, weatherStatus, setWeatherStatus, resetState],
  );

  useEffect(() => {
    if (!coords) return;
    setWeatherStatus(LOADING);
    const url = `${weatherApiUrl}${weatherApiLat}${coords.lat}${weatherApiLng}${coords.lng}${weatherApiOpts}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 404) {
          // setError(true);
          setWeatherStatus(ERROR);
        }
        //   setError(true);
        setWeatherStatus(ERROR);
        throw new Error('You have an error');
      })
      .then(object => {
        // console.log(object);
        setWeather(object);
        setWeatherStatus(ERROR);

        // setError(false);
        // setLoading(false);
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
    // const override = true;

    if (!coords || override) return;

    const getLocation = async () => {
      let locationData;

      try {
        const url = `${googleApiUrl}${coords.lat},${coords.lng}${googleApiKeySegment}`;
        const res = await fetch(url);
        locationData = await res.json();
        setAddressStatus(SUCCESS);
      } catch (error) {
        setAddressStatus(ERROR);
      }
      if (locationData.status === 'OK') {
        const res = parseAddress(locationData);
        setAddress(res);
      }
    };
    getLocation();
  }, [coords, addressStatus]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider, useAppContext };
