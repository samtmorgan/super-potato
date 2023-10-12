import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { LocationInput } from './LocationInput';
import { WeatherReadout } from './WeatherReadout';
import { WeatherImage } from './WeatherImage';

export default function PageContent() {
  const { weatherAssets } = useAppContext();
  return (
    <div>
      {/* Page Content:
        {`${loading}`} */}
      <LocationInput />
      <WeatherReadout />
      {/* <WeatherImage weatherSearchTerm={'sky'} /> */}
      {/* <WeatherImage weatherSearchTerm={'cloud'} /> */}
      <WeatherImage weatherSearchTerm={'haze'} />
      {/* <WeatherImage weatherSearchTerm={'rain'} /> */}
      {/* <WeatherImage weatherSearchTerm={'heavy&rain'} /> */}
      {/* <WeatherImage weatherSearchTerm={'rain&showers'} /> */}
      {/* <WeatherImage weatherSearchTerm={'snow'} /> */}
      {/* <WeatherImage weatherSearchTerm={'thunderstorm'} />  */}

      {/* <WeatherImage weatherSearchTerm={weatherAssets?.weatherSearchTerm || 'sunny'} /> */}
    </div>
  );
}

/* <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full active:bg-blue-800 "
              onClick={getLocation}
              type="button"
            >
              Get Location
            </button>
            <h1>Coordinates</h1>
            <p>{status}</p>
            {lat && (
              <p>
                Latitude:
                {lat}
              </p>
            )}
            {lng && (
              <p>
                Longitude:
                {lng}
              </p>
            )}
            {weather && (
              <p>
                Temperature:
                {weather.current_weather.temperature}
                °C
              </p>
            )}
          </div> */
