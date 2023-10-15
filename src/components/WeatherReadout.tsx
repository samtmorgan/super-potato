import React, { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { resolveWeatherIcon } from '@/utils/weatherAssets';

export function WeatherReadout() {
  const { weatherAssets } = useAppContext();

  // memorize the assets which we will render
  const assets = useMemo(() => {
    if (!weatherAssets) {
      return null;
    }
    const temp = weatherAssets?.current?.temp || null;
    const Icon = resolveWeatherIcon(weatherAssets.current.iconCode);
    if (temp) {
      return { temp, Icon };
    }
    return null;
  }, [weatherAssets]);

  return (
    <section
      aria-label="Current weather conditions"
      className={`font-regular h-24 w-full 
    text-4xl flex justify-items-center items-center justify-center
    `}
    >
      {assets ? (
        <>
          <p className="flex items-end ">
            <assets.Icon className="" size="5rem" />
          </p>
          <p className="mr-5">{assets.temp}</p>
        </>
      ) : (
        <p />
      )}
    </section>
  );
}
