import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { getWeatherReadoutMessage } from '@/constants/copy';
import { DENIED } from '@/constants/statuses';

export function WeatherReadout() {
  const { weatherAssets, weatherStatus, locationStatus } = useAppContext();

  if (locationStatus === DENIED) return null;

  return (
    <article>
      {weatherAssets ? (
        <>
          <p>
            Temperature:
            {`${weatherAssets.temperature}°C`}
          </p>
          <p>
            Weather:
            {weatherAssets.text}
            <weatherAssets.icon size="4em" />
          </p>
        </>
      ) : (
        <p>{getWeatherReadoutMessage(weatherStatus)}</p>
      )}
    </article>
  );
}
