import React from 'react';
import { useAppContext } from '@/context/AppContext';

export function WeatherReadout() {
  const { weatherAssets, weather } = useAppContext();
  return (
    <article>
      <h2>Weather Readout</h2>
      <p>
        Temperature:
        {weather?.current_weather?.temperature ? `${weather.current_weather.temperature}°C` : `loading...`}
      </p>
      <p>
        Weather:
        {weatherAssets ? weatherAssets.text : `loading...`} {weatherAssets ? <weatherAssets.icon size="4em" /> : null}
      </p>
    </article>
  );
}
