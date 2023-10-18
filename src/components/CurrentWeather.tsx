import React, { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { resolveWeatherIcon } from '@/utils/weatherAssets';

export function CurrentWeather() {
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
      className={`
        font-regular 
        text-4xl 
        flex 
        items-center 
        justify-center
        gap-2
    `}
    >
      {assets ? (
        <>
          <p className="flex items-end">
            <assets.Icon size="5rem" />
          </p>
          <p>{assets.temp}</p>
        </>
      ) : (
        <p />
      )}
    </section>
  );
}
