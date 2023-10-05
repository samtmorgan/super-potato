import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { ERROR, LOADING, NOT_INIT } from '@/constants/addressStatus';

export function WeatherReadout() {
  const { weatherAssets, weather, weatherStatus } = useAppContext();
  //   return (
  //     <article>
  //       <h2>Weather Readout</h2>
  //       <p>
  //         Temperature:
  //         {weather?.current_weather?.temperature ? `${weather.current_weather.temperature}°C` : `loading...`}
  //       </p>
  //       <p>
  //         Weather:
  //         {weatherAssets ? weatherAssets.text : `loading...`}
  //         {weatherAssets ? <weatherAssets.icon size="4em" /> : null}
  //       </p>
  //     </article>
  //   );
  return weather ? (
    <article>
      <p>
        Temperature:
        {weather?.current_weather?.temperature ? `${weather.current_weather.temperature}°C` : `loading...`}
      </p>
      <p>
        Weather:
        {weatherAssets ? weatherAssets.text : `loading...`}
        {weatherAssets ? <weatherAssets.icon size="4em" /> : null}
      </p>
    </article>
  ) : (
    <article>
      {weatherStatus === NOT_INIT && <p>Press use location to get the weather.</p>}
      {weatherStatus === LOADING && <p>Loading...</p>}
      {weatherStatus === ERROR && <p>Oops, there was a problem getting the weather, try again.</p>}
    </article>
  );
}
